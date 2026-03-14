import os
import re

nav_html = """  <nav class="navbar">
    <div class="container">
      <a href="index.html" class="navbar-brand"><i class="fa-solid fa-plane-up"></i> TripPilot</a>
      <button class="navbar-toggle" id="navbar-toggle"><i class="fa-solid fa-bars"></i></button>
      <ul class="navbar-nav" id="navbar-nav">
        <li><a href="index.html" class="nav-link">Home</a></li>
        <li><a href="explore.html" class="nav-link">Explore</a></li>
        <li><a href="dashboard.html" class="nav-link" id="nav-my-trips" style="display:none;">My Trips</a></li>
        <li id="nav-auth-links">
          <a href="login.html" class="btn btn-outline" style="margin-right: 0.5rem; padding: 0.5rem 1rem; font-size: 0.875rem;" id="login-button">Login</a>
          <a href="register.html" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.875rem;">Register</a>
        </li>
      </ul>
    </div>
  </nav>"""

for filename in os.listdir("."):
    if filename.endswith(".html"):
        with open(filename, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Replace the nav element
        content = re.sub(r'<nav class="navbar">.*?</nav>', nav_html, content, flags=re.DOTALL)
        
        with open(filename, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated nav in {filename}")
