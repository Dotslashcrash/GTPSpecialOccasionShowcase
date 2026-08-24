(() => {
  document.querySelectorAll('.nav-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!open));
      document.getElementById('brand-nav')?.classList.toggle('open', !open);
    });
  });

  const filterButtons = document.querySelectorAll('[data-filter]');
  const occasionCards = document.querySelectorAll('[data-group]');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((item) => {
        item.classList.remove('active');
        item.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
      occasionCards.forEach((card) => {
        card.hidden =
          button.dataset.filter !== 'all' && card.dataset.group !== button.dataset.filter;
      });
    });
  });

  document.querySelectorAll('[data-rsvp-demo]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const select = form.querySelector('select');
      const status = form.querySelector('.rsvp-status');
      if (select?.selectedIndex === 0) {
        if (status) status.textContent = 'Choose a sample response first.';
        select?.focus();
      } else if (status) status.textContent = 'Saved to this browser-only demonstration.';
    });
  });

  document.querySelectorAll('[data-reveal]').forEach((button) => {
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!open));
      button.textContent = open ? 'Open the news' : 'We bought our first home!';
    });
  });

  document.querySelectorAll('[data-share]').forEach((button) => {
    button.addEventListener('click', async () => {
      const status = button.parentElement?.querySelector('.share-status');
      const data = {
        title: document.title,
        text: 'A fictional GTP special-occasion website sample',
        url: location.href,
      };
      try {
        if (navigator.share) {
          await navigator.share(data);
          if (status) status.textContent = 'Share options opened.';
        } else {
          await navigator.clipboard.writeText(location.href);
          if (status) status.textContent = 'Link copied to your clipboard.';
        }
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError') && status) {
          status.textContent = 'Select and copy the address from your browser.';
        }
      }
    });
  });
})();
