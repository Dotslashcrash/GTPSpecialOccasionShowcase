(() => {
  const root = document.querySelector('[data-portal]');
  const dataNode = document.getElementById('occasion-data');
  if (!root || !dataNode) return;

  const original = JSON.parse(dataNode.textContent || '{}');
  const storageKey = `gtp-occasion-demo:${original.slug}:v2`;
  const clone = (value) => JSON.parse(JSON.stringify(value));
  let state = clone(original);

  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) state = { ...state, ...JSON.parse(saved) };
  } catch {
    // The preview remains functional when browser storage is unavailable.
  }
  state.gallery = state.gallery.map((item, index) =>
    typeof item === 'string'
      ? {
          src: item,
          alt: `Gallery image ${index + 1}`,
          caption: `Gallery image ${index + 1}`,
          visible: true,
          cover: index === 0,
        }
      : item,
  );

  const $ = (selector, scope = root) => scope.querySelector(selector);
  const $$ = (selector, scope = root) => [...scope.querySelectorAll(selector)];
  const indicator = $('[data-save-indicator]');

  function announce(message) {
    if (!indicator) return;
    indicator.textContent = message;
    indicator.classList.add('saved');
    window.setTimeout(() => indicator.classList.remove('saved'), 1400);
  }

  function persist(message = 'Saved to this browser-only preview.') {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      /* local fallback only */
    }
    announce(message);
    renderOverview();
  }

  function renderOverview() {
    $$('[data-preview-title]').forEach((node) => {
      node.textContent = state.title;
    });
    $$('[data-preview-intro]').forEach((node) => {
      node.textContent = state.intro;
    });
    $$('[data-preview-date]').forEach((node) => {
      node.textContent = state.date;
    });
    const visible = $('[data-visible-count]');
    const gallery = $('[data-gallery-count]');
    const pending = $('[data-pending-count]');
    if (visible) visible.textContent = state.modules.filter((item) => item.visible).length;
    if (gallery) {
      const visibleImages = state.gallery.filter((item) => item.visible).length;
      gallery.textContent = `${visibleImages} visible / ${state.gallery.length} total`;
    }
    if (pending)
      pending.textContent = state.messages.filter((item) => item.status === 'Pending').length;
  }

  function setPanel(name) {
    $$('[data-panel]').forEach((panel) => {
      const active = panel.dataset.panel === name;
      panel.hidden = !active;
      panel.classList.toggle('active', active);
    });
    $$('[data-panel-target]').forEach((button) => {
      const active = button.dataset.panelTarget === name;
      button.classList.toggle('active', active);
      if (active) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    const title = $('[data-workspace-title]');
    const selected = $(`[data-panel-target="${name}"]`);
    if (title && selected) title.textContent = selected.textContent.trim();
    if (name === 'sections') renderSections();
    if (name === 'timeline') renderTimeline();
    if (name === 'gallery') renderGallery();
    if (name === 'messages') renderMessages();
    if (name === 'resources') renderResources();
  }

  $$('[data-panel-target]').forEach((button) =>
    button.addEventListener('click', () => setPanel(button.dataset.panelTarget)),
  );
  $$('[data-jump]').forEach((button) =>
    button.addEventListener('click', () => setPanel(button.dataset.jump)),
  );

  const entry = $('[data-entry]');
  $('[data-enter]')?.addEventListener('click', () => {
    entry?.classList.add('dismissed');
    window.setTimeout(() => entry?.remove(), 320);
    $('[data-panel-target="overview"]')?.focus();
  });

  $$('[data-device]').forEach((button) =>
    button.addEventListener('click', () => {
      $$('[data-device]').forEach((item) => {
        item.classList.remove('active');
        item.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
      $('[data-preview-frame]')?.classList.toggle('mobile', button.dataset.device === 'mobile');
      announce(`${button.textContent.trim()} preview selected`);
    }),
  );

  const contentForm = $('[data-content-form]');
  const introField = contentForm?.elements.namedItem('intro');
  function fillContent() {
    if (!contentForm) return;
    contentForm.elements.namedItem('title').value = state.title;
    contentForm.elements.namedItem('intro').value = state.intro;
    contentForm.elements.namedItem('date').value = state.date;
    contentForm.elements.namedItem('location').value = state.location;
    const count = $('[data-character-count]');
    if (count) count.textContent = state.intro.length;
  }
  introField?.addEventListener('input', () => {
    const count = $('[data-character-count]');
    if (count) count.textContent = introField.value.length;
  });
  contentForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contentForm.reportValidity()) return;
    const formData = new FormData(contentForm);
    state.title = String(formData.get('title'));
    state.intro = String(formData.get('intro'));
    state.date = String(formData.get('date'));
    state.location = String(formData.get('location'));
    persist();
  });
  $('[data-undo-content]')?.addEventListener('click', () => {
    fillContent();
    announce('Unsaved edits cleared');
  });

  function renderSections() {
    const list = $('[data-section-list]');
    if (!list) return;
    list.replaceChildren(
      ...state.modules.map((module, index) => {
        const item = document.createElement('li');
        item.innerHTML = `<span class="drag-handle" aria-hidden="true">⠿</span><div><strong></strong><small></small></div><label class="switch"><input type="checkbox"><span>Visible</span></label><div class="order-actions"><button type="button" aria-label="Move section up">↑</button><button type="button" aria-label="Move section down">↓</button></div>`;
        $('strong', item).textContent = module.name;
        $('small', item).textContent = module.visible
          ? 'Shown on the public sample'
          : 'Hidden from the public sample';
        const checkbox = $('input', item);
        checkbox.checked = module.visible;
        checkbox.addEventListener('change', () => {
          module.visible = checkbox.checked;
          persist(`${module.name} ${module.visible ? 'shown' : 'hidden'}`);
          renderSections();
        });
        const buttons = $$('button', item);
        buttons[0].disabled = index === 0;
        buttons[1].disabled = index === state.modules.length - 1;
        buttons[0].addEventListener('click', () => moveSection(index, -1));
        buttons[1].addEventListener('click', () => moveSection(index, 1));
        return item;
      }),
    );
  }

  function moveSection(index, direction) {
    const target = index + direction;
    if (target < 0 || target >= state.modules.length) return;
    [state.modules[index], state.modules[target]] = [state.modules[target], state.modules[index]];
    persist('Section order updated');
    renderSections();
    $$('[data-section-list] button')[
      direction < 0
        ? Math.max(0, target * 2)
        : Math.min(state.modules.length * 2 - 1, target * 2 + 1)
    ]?.focus();
  }

  const timelineDialog = $('[data-timeline-dialog]');
  const timelineForm = $('[data-timeline-form]');
  function openTimeline(index = null) {
    const item = index === null ? { year: '', title: '', body: '' } : state.timeline[index];
    timelineForm.elements.namedItem('index').value = index === null ? '' : String(index);
    timelineForm.elements.namedItem('year').value = item.year;
    timelineForm.elements.namedItem('title').value = item.title;
    timelineForm.elements.namedItem('body').value = item.body;
    $('#timeline-dialog-title').textContent =
      index === null ? 'Add timeline item' : 'Edit timeline item';
    timelineDialog.showModal();
    timelineForm.elements.namedItem('year').focus();
  }
  $('[data-add-timeline]')?.addEventListener('click', () => openTimeline());
  $$('[data-close-dialog]').forEach((button) =>
    button.addEventListener('click', () => timelineDialog.close()),
  );
  timelineForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!timelineForm.reportValidity()) return;
    const formData = new FormData(timelineForm);
    const item = {
      year: String(formData.get('year')),
      title: String(formData.get('title')),
      body: String(formData.get('body')),
    };
    const index = String(formData.get('index'));
    if (index === '') state.timeline.push(item);
    else state.timeline[Number(index)] = item;
    timelineDialog.close();
    persist(index === '' ? 'Timeline item added' : 'Timeline item updated');
    renderTimeline();
    $('[data-add-timeline]')?.focus();
  });
  timelineDialog?.addEventListener('click', (event) => {
    if (event.target === timelineDialog) timelineDialog.close();
  });

  function renderTimeline() {
    const list = $('[data-timeline-list]');
    if (!list) return;
    list.replaceChildren(
      ...state.timeline.map((item, index) => {
        const article = document.createElement('article');
        article.innerHTML = `<time></time><div><h4></h4><p></p></div><div><button type="button">Edit</button><button type="button" class="danger">Remove</button></div>`;
        $('time', article).textContent = item.year;
        $('h4', article).textContent = item.title;
        $('p', article).textContent = item.body;
        const buttons = $$('button', article);
        buttons[0].addEventListener('click', () => openTimeline(index));
        buttons[1].addEventListener('click', () => {
          state.timeline.splice(index, 1);
          persist('Timeline item removed');
          renderTimeline();
        });
        return article;
      }),
    );
  }

  function renderGallery() {
    const list = $('[data-gallery-list]');
    if (!list) return;
    list.replaceChildren(
      ...state.gallery.map((item, index) => {
        const figure = document.createElement('figure');
        figure.classList.toggle('gallery-hidden', !item.visible);
        figure.classList.toggle('gallery-cover', item.cover);
        const image = document.createElement('img');
        image.src = item.src;
        image.alt = item.alt;
        const caption = document.createElement('figcaption');
        caption.innerHTML = `<form><strong></strong><label>Caption<input name="caption" maxlength="120" required></label><label>Alt text<input name="alt" maxlength="160" required></label><div class="gallery-item-actions"><button type="button" data-cover>Use as cover</button><button type="button" data-visibility></button><button type="button" data-up aria-label="Move image up">↑</button><button type="button" data-down aria-label="Move image down">↓</button><button type="button" class="danger" data-remove>Remove</button><button type="submit">Save details</button></div></form>`;
        $('strong', caption).textContent = item.cover
          ? `Image ${index + 1} · Cover image`
          : `Image ${index + 1}`;
        $('[name="caption"]', caption).value = item.caption;
        $('[name="alt"]', caption).value = item.alt;
        $('[data-cover]', caption).disabled = item.cover;
        $('[data-visibility]', caption).textContent = item.visible ? 'Hide image' : 'Show image';
        $('[data-up]', caption).disabled = index === 0;
        $('[data-down]', caption).disabled = index === state.gallery.length - 1;
        $('form', caption).addEventListener('submit', (event) => {
          event.preventDefault();
          const values = new FormData(event.currentTarget);
          item.caption = String(values.get('caption'));
          item.alt = String(values.get('alt'));
          persist();
          renderGallery();
        });
        $('[data-cover]', caption).addEventListener('click', () => {
          state.gallery.forEach((galleryItem) => {
            galleryItem.cover = false;
          });
          item.cover = true;
          persist('Cover image updated in this browser-only preview.');
          renderGallery();
        });
        $('[data-visibility]', caption).addEventListener('click', () => {
          item.visible = !item.visible;
          persist(`Image ${item.visible ? 'shown' : 'hidden'} in this browser-only preview.`);
          renderGallery();
        });
        const moveGalleryImage = (direction) => {
          const target = index + direction;
          if (target < 0 || target >= state.gallery.length) return;
          [state.gallery[index], state.gallery[target]] = [
            state.gallery[target],
            state.gallery[index],
          ];
          persist('Gallery order saved to this browser-only preview.');
          renderGallery();
        };
        $('[data-up]', caption).addEventListener('click', () => moveGalleryImage(-1));
        $('[data-down]', caption).addEventListener('click', () => moveGalleryImage(1));
        $('[data-remove]', caption).addEventListener('click', () => {
          const wasCover = item.cover;
          state.gallery.splice(index, 1);
          if (wasCover && state.gallery[0]) state.gallery[0].cover = true;
          persist('Gallery image removed from this browser-only preview.');
          renderGallery();
        });
        figure.append(image, caption);
        return figure;
      }),
    );
    $('[data-gallery-empty]').hidden = state.gallery.length !== 0;
  }
  $('[data-gallery-upload]')?.addEventListener('change', (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      announce('Choose a supported image file');
      return;
    }
    if (file.size > 3_000_000) {
      announce('Choose an image smaller than 3 MB');
      return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      state.gallery.push({
        src: String(reader.result),
        alt: file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '),
        caption: 'New local preview image',
        visible: true,
        cover: state.gallery.length === 0,
      });
      persist('Local image added to this browser-only preview.');
      renderGallery();
      event.target.value = '';
    });
    reader.readAsDataURL(file);
  });

  function renderMessages() {
    const list = $('[data-message-list]');
    if (!list) return;
    list.replaceChildren(
      ...state.messages.map((message, index) => {
        const article = document.createElement('article');
        article.innerHTML = `<div><span></span><p></p><blockquote></blockquote></div><div class="moderation-actions"><button type="button" class="approve">Approve</button><button type="button" class="danger">Remove</button></div>`;
        $('span', article).textContent = message.status;
        $('span', article).className = `status-${message.status.toLowerCase()}`;
        $('p', article).textContent = `${message.name} · ${message.relationship}`;
        $('blockquote', article).textContent = message.message;
        const buttons = $$('button', article);
        buttons[0].hidden = message.status === 'Approved';
        buttons[0].addEventListener('click', () => {
          message.status = 'Approved';
          persist('Message approved in this demo');
          renderMessages();
        });
        buttons[1].addEventListener('click', () => {
          state.messages.splice(index, 1);
          persist('Message removed from this demo');
          renderMessages();
        });
        return article;
      }),
    );
  }

  function renderResources() {
    const form = $('[data-resource-form]');
    if (!form) return;
    form.replaceChildren(
      ...state.resources.flatMap((resource, index) => {
        const fieldset = document.createElement('fieldset');
        fieldset.innerHTML = `<legend></legend><label>Display label<input name="label-${index}" required></label><label>Destination or note<input name="value-${index}" required></label>`;
        $('legend', fieldset).textContent = resource.kind;
        $(`[name="label-${index}"]`, fieldset).value = resource.label;
        $(`[name="value-${index}"]`, fieldset).value = resource.value;
        return [fieldset];
      }),
    );
    const actions = document.createElement('div');
    actions.className = 'form-actions';
    actions.innerHTML = '<button class="button" type="submit">Save resource links</button>';
    form.append(actions);
  }
  $('[data-resource-form]')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    state.resources.forEach((resource, index) => {
      resource.label = String(values.get(`label-${index}`));
      resource.value = String(values.get(`value-${index}`));
    });
    persist('Resource links saved to this demo');
  });

  $('[data-reset]')?.addEventListener('click', () => {
    state = clone(original);
    try {
      localStorage.removeItem(storageKey);
    } catch {
      /* no persistent state */
    }
    fillContent();
    renderSections();
    renderTimeline();
    renderGallery();
    renderMessages();
    renderResources();
    renderOverview();
    setPanel('overview');
    announce('Demo restored to its original state');
  });

  fillContent();
  renderOverview();
})();
