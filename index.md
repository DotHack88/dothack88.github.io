---
layout: default
title: Home
---

<section class="hero">
  <img src="/assets/img/hero.png" alt="Game Over Hero">
  <h1>Hi, I'm Game Over</h1>
  <p>A versatile management + e-commerce platform for gamers.</p>
  <a href="/portfolio/" class="cta">Get Started</a>
</section>

<section class="projects">
  <h2>Latest Projects</h2>
  {% for post in site.posts limit:3 %}
    <div class="card">
      <h3>{{ post.title }}</h3>
      <p>{{ post.excerpt }}</p>
      <a href="{{ post.url }}">→</a>
    </div>
  {% endfor %}
</section>
