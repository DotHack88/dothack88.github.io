---
layout: default
title: Home
---

# Benvenuto su Game Over 🎮

Scopri ultime novità, guide, snippet di codice e tanto gaming.

## Articoli recenti
{% for post in paginator.posts %}
- [{{ post.title }}]({{ post.url }}) – *{{ post.date | date: "%b %d, %Y" }}*
{% endfor %}

{% if paginator.total_pages > 1 %}
<div class="pagination">
  {% if paginator.previous_page %}
    <a href="{{ paginator.previous_page_path }}">« precedente</a>
  {% endif %}
  {% if paginator.next_page %}
    <a href="{{ paginator.next_page_path }}">successivo »</a>
  {% endif %}
</div>
{% endif %}
