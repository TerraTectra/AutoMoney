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
    for md_file in glob('content/*.md'):
        print(f"[LOG] Обработка markdown-файла: {md_file}")
        try:
            with open(md_file, encoding='utf-8') as f:
                md = f.read()
            html = markdown.markdown(md)
            title = extract_title(md)
            slug = slugify(title)
            html_path = f'public/{slug}.html'
            print(f"[LOG] Создание HTML-файла: {html_path}")
            with open(html_path, 'w', encoding='utf-8') as f:
                f.write(template.render(
                    title=title,
                    date=today(),
                    content=html,
                    partner_asin='B00EXAMPLE',
                    amazon_id='your-tag-20',
                    adsense_code='<script>...</script>'
                ))
            print(f"[LOG] HTML-файл успешно создан: {html_path}")
        except Exception as e:
            print(f"[LOG] Ошибка при обработке {md_file}: {e}")

    # Генерация index.html
    try:
        index_template = env.get_template('index.html')
        articles = []
        for md_file in glob('content/*.md'):
            with open(md_file, encoding='utf-8') as f:
                md = f.read()
            title = extract_title(md)
            slug = slugify(title)
            html_file = f'{slug}.html'
            # Получаем дату из файла или используем сегодняшнюю
            date = today()
            try:
                stat = os.stat(md_file)
                date = datetime.fromtimestamp(stat.st_mtime).strftime('%Y-%m-%d')
            except Exception:
                pass
            articles.append({
                'title': title,
                'url': html_file,
                'date': date
            })
        articles = sorted(articles, key=lambda x: x['date'], reverse=True)
        index_path = 'public/index.html'
        with open(index_path, 'w', encoding='utf-8') as f:
            f.write(index_template.render(articles=articles, year=datetime.now().year))
        print(f"[LOG] Главная страница успешно создана: {index_path}")
    except Exception as e:
        print(f"[LOG] Ошибка при генерации index.html: {e}")
    print('[LOG] Генерация и публикация завершены.')

if __name__ == '__main__':
    main()
