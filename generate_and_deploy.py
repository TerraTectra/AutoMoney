import os
import markdown
from glob import glob
from datetime import datetime
from jinja2 import Environment, FileSystemLoader
import subprocess

# Используем keywords.csv как источник ключевых слов

def fetch_keywords():
    if not os.path.exists('keywords.csv'):
        print('keywords.csv не найден. Добавьте ключевые слова!')
        return []
    with open('keywords.csv', encoding='utf-8') as f:
        keywords = [line.strip() for line in f if line.strip()]
    return keywords

# Генерация статей через локальную LLM (ollama), если доступна

def generate_article(keyword):
    """
    Генерирует SEO-статью по ключу через Ollama (mistral:7b-instruct),
    если Ollama недоступен — возвращает заглушку.
    """
    import subprocess
    import os
    prompt = f"Напиши SEO-статью на русском языке по теме: '{keyword}'. Статья должна быть уникальной, структурированной, с подзаголовками и списками."
    log_dir = 'logs'
    os.makedirs(log_dir, exist_ok=True)
    log_path = os.path.join(log_dir, 'ollama.log')
    try:
        print(f"[LOG] Попытка генерации статьи через Ollama: {keyword}")
        result = subprocess.run(
            ["ollama", "run", "mistral:7b-instruct", prompt],
            capture_output=True, text=True, timeout=180, encoding="utf-8", errors="ignore"
        )
        with open(log_path, 'a', encoding='utf-8') as logf:
            logf.write(f"\n---\nKEYWORD: {keyword}\nSTDOUT:\n{result.stdout}\nSTDERR:\n{result.stderr}\n")
        if result.returncode == 0 and result.stdout.strip():
            print(f"[LOG] Статья успешно сгенерирована через Ollama по ключу: {keyword}")
            print(f"[LOG] Первые 200 символов: {result.stdout.strip()[:200]}")
            return result.stdout.strip()
        else:
            print(f"[LOG] Ollama вернул ошибку или пустой результат по ключу: {keyword}")
            if result.stderr:
                print(f"[LOG] Stderr Ollama: {result.stderr}")
            # Сохраняем даже частичный результат, если есть
            if result.stdout.strip():
                print(f"[LOG] Сохраняем частичный результат Ollama для {keyword}")
                print(f"[LOG] Первые 200 символов: {result.stdout.strip()[:200]}")
                return result.stdout.strip()
    except Exception as e:
        print(f"[LOG] Ollama недоступен или произошла ошибка: {e}")
    print(f"[LOG] Используется заглушка для статьи по ключу: {keyword}")
    return f"# {keyword}\n\n(Тут будет сгенерированная статья. Настройте Ollama для реального текста.)"

def slugify(text):
    return "".join(c if c.isalnum() else "-" for c in text.lower()).strip('-')

def today():
    return datetime.now().strftime('%Y-%m-%d')

def extract_title(md):
    for line in md.splitlines():
        if line.strip().startswith('# '):
            return line.strip('# ').strip()
    return md.splitlines()[0][:40]

# Основной цикл

def main():
    if not os.path.exists('content'):
        os.makedirs('content')
    if not os.path.exists('public'):
        os.makedirs('public')
    if not os.path.exists('logs'):
        os.makedirs('logs')
    if not os.path.exists('templates'):
        os.makedirs('templates')

    # Сбор ключей
    keywords = fetch_keywords()
    print(f"[LOG] Ключевые слова: {keywords}")
    # Тестовая запись файла
    try:
        with open('content/test.txt', 'w', encoding='utf-8') as f:
            f.write('test')
        print('[LOG] Тестовый файл успешно создан: content/test.txt')
    except Exception as e:
        print(f'[LOG] Ошибка при создании тестового файла: {e}')
    # Генерация статей
    for kw in keywords[:5]:
        article = generate_article(kw)
        slug = slugify(kw)
        md_path = f'content/{slug}.md'
        print(f"[LOG] Создание файла: {md_path}")
        try:
            with open(md_path, 'w', encoding='utf-8') as f:
                f.write(f"# {kw}\n\n{article}")
            print(f"[LOG] Файл успешно создан: {md_path}")
        except Exception as e:
            print(f"[LOG] Ошибка при создании файла {md_path}: {e}")

    # Конвертация и публикация
    env = Environment(loader=FileSystemLoader('templates'))
    template = env.get_template('article.html')
    site_url = 'https://terratectra.github.io/AutoMoney'
    today_str = today()
    articles = []
    for md_file in glob('content/*.md'):
        print(f"[LOG] Обработка markdown-файла: {md_file}")
        try:
            with open(md_file, encoding='utf-8') as f:
                md = f.read()
            html = markdown.markdown(md)
            title = extract_title(md)
            slug = slugify(title)
            html_path = f'public/{slug}.html'
            # Описание для мета-тега (первые 160 символов без тегов)
            plain_text = re.sub('<[^<]+?>', '', html)
            description = plain_text.strip().replace('\n', ' ')[:160]
            with open(html_path, 'w', encoding='utf-8') as f:
                f.write(template.render(
                    title=title,
                    date=today_str,
                    content=html,
                    partner_asin='B00EXAMPLE',
                    amazon_id='your-tag-20',
                    adsense_code='<script>...</script>',
                    description=description,
                    canonical=f'{site_url}/{slug}.html',
                ))
            print(f"[LOG] HTML-файл успешно создан: {html_path}")
            # Для sitemap.xml и robots.txt
            mtime = today_str
            try:
                stat = os.stat(md_file)
                mtime = datetime.fromtimestamp(stat.st_mtime).strftime('%Y-%m-%d')
            except Exception:
                pass
            articles.append({
                'title': title,
                'url': f'{slug}.html',
                'date': mtime
            })
        except Exception as e:
            print(f"[LOG] Ошибка при обработке {md_file}: {e}")

    # Генерация index.html
    try:
        index_template = env.get_template('index.html')
        articles_sorted = sorted(articles, key=lambda x: x['date'], reverse=True)
        with open('public/index.html', 'w', encoding='utf-8') as f:
            f.write(index_template.render(articles=articles_sorted, today=today_str))
        print('[LOG] Главная страница успешно создана: public/index.html')
    except Exception as e:
        print(f'[LOG] Ошибка при генерации index.html: {e}')

    # Генерация sitemap.xml
    try:
        sitemap_template = env.get_template('sitemap.xml')
        with open('public/sitemap.xml', 'w', encoding='utf-8') as f:
            f.write(sitemap_template.render(articles=articles, site_url=site_url, today=today_str))
        print('[LOG] sitemap.xml успешно создан')
    except Exception as e:
        print(f'[LOG] Ошибка при генерации sitemap.xml: {e}')

    # Генерация robots.txt
    try:
        robots_template = env.get_template('robots.txt')
        with open('public/robots.txt', 'w', encoding='utf-8') as f:
            f.write(robots_template.render(site_url=site_url))
        print('[LOG] robots.txt успешно создан')
    except Exception as e:
        print(f'[LOG] Ошибка при генерации robots.txt: {e}')
    print('[LOG] Генерация и публикация завершены.')

def deploy_to_github_pages():
    """
    Деплой статей из папки public в ветку gh-pages на GitHub.
    Требуется предварительная настройка репозитория и прав.
    """
    import subprocess
    import shutil
    import tempfile
    try:
        print('[LOG] Начинается деплой в gh-pages...')
        repo_dir = os.path.abspath('.')
        public_dir = os.path.join(repo_dir, 'public')
        # Получаем URL origin
        result = subprocess.run(['git', 'config', '--get', 'remote.origin.url'], capture_output=True, text=True)
        remote_url = result.stdout.strip()
        print(f'[LOG] origin: {remote_url}')
        if not remote_url:
            print('[LOG] Не найден origin remote. Пропуск деплоя.')
            return
        # Создаем временную рабочую папку
        with tempfile.TemporaryDirectory() as tmpdir:
            print(f'[LOG] Клонируем gh-pages из {remote_url} во временную папку...')
            clone_proc = subprocess.run([
                'git', 'clone', '--branch', 'gh-pages', '--single-branch', remote_url, tmpdir
            ], capture_output=True, text=True)
            print(f'[LOG] Результат clone: {clone_proc.stdout}\n{clone_proc.stderr}')
            # Копируем новые html-файлы
            for f in os.listdir(public_dir):
                src = os.path.join(public_dir, f)
                dst = os.path.join(tmpdir, f)
                shutil.copy2(src, dst)
            # Делаем коммит и пуш
            subprocess.run(['git', '-C', tmpdir, 'add', '.'], check=True)
            subprocess.run(['git', '-C', tmpdir, 'commit', '-m', 'Auto-publish articles', '--allow-empty'], check=True)
            push_proc = subprocess.run(['git', '-C', tmpdir, 'push', 'origin', 'gh-pages'], capture_output=True, text=True)
            print(f'[LOG] Результат push: {push_proc.stdout}\n{push_proc.stderr}')
        print('[LOG] Публикация завершена успешно!')
    except Exception as e:
        print(f'[LOG] Ошибка публикации: {e}')

if __name__ == '__main__':
    main()
    deploy_to_github_pages()
