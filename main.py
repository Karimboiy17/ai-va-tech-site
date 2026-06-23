from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
import json, os
from pathlib import Path
import jinja2

app = FastAPI(title="AI va Tech")
app.mount("/static", StaticFiles(directory="static"), name="static")

# Direct Jinja2 env
jinja_env = jinja2.Environment(
    loader=jinja2.FileSystemLoader("templates"),
    autoescape=jinja2.select_autoescape()
)

def load_articles():
    articles_dir = Path("articles")
    articles = []
    for f in sorted(articles_dir.glob("*.json"), reverse=True):
        with open(f) as fh:
            article = json.load(fh)
            article["id"] = f.stem
            articles.append(article)
    return articles

def load_article(article_id: str):
    path = Path(f"articles/{article_id}.json")
    if not path.exists():
        return None
    with open(path) as f:
        article = json.load(f)
        article["id"] = article_id
        return article

def render(template_name: str, **context):
    """Render a Jinja2 template."""
    template = jinja_env.get_template(template_name)
    html = template.render(**context)
    return HTMLResponse(html)

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    articles = load_articles()
    return render("index.html", request=request, articles=articles)

@app.get("/article/{article_id}", response_class=HTMLResponse)
async def article(request: Request, article_id: str):
    article_data = load_article(article_id)
    if not article_data:
        return HTMLResponse("<h1>Maqola topilmadi</h1>", status_code=404)
    return render("article.html", request=request, article=article_data)
