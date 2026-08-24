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
  const filterResult = document.querySelector('[data-filter-result]');
  const applyFilter = (button) => {
    filterButtons.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-pressed', 'false');
    });
    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');
    occasionCards.forEach((card) => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.group !== button.dataset.filter;
    });
    if (filterResult) {
      const visible = [...occasionCards].filter((card) => !card.hidden).length;
      filterResult.textContent =
        button.dataset.filter === 'all'
          ? `Showing all ${visible} experiences.`
          : `Showing ${visible} ${button.textContent.trim().toLowerCase()} experiences.`;
    }
  };
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      applyFilter(button);
    });
  });
  document.querySelectorAll('[data-occasion-jump]').forEach((link) => {
    link.addEventListener('click', () => {
      const target = [...filterButtons].find(
        (button) => button.dataset.filter === link.dataset.occasionJump,
      );
      if (target) applyFilter(target);
    });
  });

  const privateGate = document.querySelector('[data-private-gate]');
  const privateReveal = document.querySelector('[data-private-reveal]');
  const privateKeyForm = document.querySelector('[data-private-key-form]');
  const privateKeyStatus = document.querySelector('[data-private-key-status]');
  const privateKeyInput = privateKeyForm?.querySelector('input[name="access-key"]');

  privateKeyForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (privateKeyInput?.value.trim().toLowerCase() !== 'surprise') {
      if (privateKeyStatus)
        privateKeyStatus.textContent = 'That key did not open this demo. Try Surprise.';
      privateKeyInput?.focus();
      return;
    }
    if (privateKeyStatus) privateKeyStatus.textContent = '';
    privateGate.hidden = true;
    privateReveal.hidden = false;
    privateReveal.querySelector('h1')?.focus();
  });

  document.querySelector('[data-private-lock]')?.addEventListener('click', () => {
    privateReveal.hidden = true;
    privateGate.hidden = false;
    if (privateKeyInput) privateKeyInput.value = '';
    privateKeyInput?.focus();
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

  document.querySelectorAll('[data-countdown]').forEach((countdown) => {
    const eventTime = Date.parse(countdown.dataset.countdown || '');
    const update = () => {
      const remaining = Math.max(0, eventTime - Date.now());
      const days = Math.floor(remaining / 86_400_000);
      const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
      const minutes = Math.floor((remaining % 3_600_000) / 60_000);
      const values = [days, hours, minutes];
      ['[data-countdown-days]', '[data-countdown-hours]', '[data-countdown-minutes]'].forEach(
        (selector, index) => {
          const node = countdown.querySelector(selector);
          if (node) node.textContent = String(values[index]).padStart(2, '0');
        },
      );
    };
    if (!Number.isNaN(eventTime)) {
      update();
      window.setInterval(update, 60_000);
    }
  });

  document.querySelectorAll('[data-public-gallery]').forEach((gallery) => {
    const triggers = [...gallery.querySelectorAll('[data-gallery-open]')];
    const dialog = gallery.querySelector('[data-gallery-dialog]');
    const image = gallery.querySelector('[data-gallery-image]');
    const caption = gallery.querySelector('[data-gallery-caption]');
    const position = gallery.querySelector('[data-gallery-position]');
    const swipeArea = gallery.querySelector('[data-gallery-swipe]');
    let index = 0;
    let returnFocus = null;
    let touchStart = 0;

    const show = (nextIndex) => {
      index = (nextIndex + triggers.length) % triggers.length;
      const source = triggers[index].querySelector('img');
      const text =
        triggers[index].closest('figure')?.querySelector('figcaption')?.textContent || '';
      if (image && source) {
        image.src = source.currentSrc || source.src;
        image.alt = source.alt;
      }
      if (caption) caption.textContent = text;
      if (position) position.textContent = `${index + 1} of ${triggers.length}`;
    };

    triggers.forEach((trigger, triggerIndex) => {
      trigger.addEventListener('click', () => {
        returnFocus = trigger;
        show(triggerIndex);
        dialog?.showModal();
        gallery.querySelector('[data-gallery-close]')?.focus();
      });
    });
    gallery.querySelector('[data-gallery-close]')?.addEventListener('click', () => dialog?.close());
    gallery.querySelector('[data-gallery-prev]')?.addEventListener('click', () => show(index - 1));
    gallery.querySelector('[data-gallery-next]')?.addEventListener('click', () => show(index + 1));
    dialog?.addEventListener('close', () => returnFocus?.focus());
    dialog?.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog?.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') show(index - 1);
      if (event.key === 'ArrowRight') show(index + 1);
    });
    swipeArea?.addEventListener(
      'touchstart',
      (event) => {
        touchStart = event.changedTouches[0]?.clientX ?? 0;
      },
      { passive: true },
    );
    swipeArea?.addEventListener(
      'touchend',
      (event) => {
        const distance = (event.changedTouches[0]?.clientX ?? touchStart) - touchStart;
        if (Math.abs(distance) > 45) show(index + (distance < 0 ? 1 : -1));
      },
      { passive: true },
    );
  });

  document.querySelectorAll('[data-demo-resource]').forEach((button) => {
    button.addEventListener('click', () => {
      const section = button.closest('.sample-resources');
      const dialog = section?.querySelector('[data-resource-dialog]');
      const title = section?.querySelector('[data-resource-dialog-title]');
      const copy = section?.querySelector('[data-resource-dialog-copy]');
      if (title) title.textContent = `Preview ${button.dataset.resourceLabel}`;
      if (copy)
        copy.textContent = `On a finished customer site, this ${button.dataset.resourceKind?.toLowerCase()} control would open a verified, customer-approved destination. This fictional preview does not contact an outside organization.`;
      dialog?.showModal();
      section?.querySelector('[data-resource-dialog-close]')?.focus();
    });
  });
  document.querySelectorAll('[data-resource-dialog]').forEach((dialog) => {
    dialog
      .querySelector('[data-resource-dialog-close]')
      ?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
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
