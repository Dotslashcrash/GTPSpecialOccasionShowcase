# Architecture

## Runtime shape

Astro produces static HTML, CSS, JavaScript, images, XML, and routing configuration in `dist`. Azure Static Web Apps serves those files directly. There is no server runtime, API, database, identity provider, telemetry service, storage account, or Azure Function.

## Content flow

`src/content/site.ts` is the single source for the GTP offer, company links, and contact address. `src/content/occasions.ts` is the typed source for every fictional sample. Astro dynamic route files call `getStaticPaths`, so each guest and portal route becomes its own HTML file during the build.

```text
typed configuration
  -> public sample renderer -> /samples/<occasion>/index.html
  -> portal renderer        -> /samples/<occasion>/admin-preview/index.html
```

The public renderer uses an occasion-specific theme and structural layout. The portal uses one high-end GTP workspace shell while changing navigation labels, modules, content, resources, and workflows for each occasion.

## Browser-only preview state

The portal serializes only fictional demonstration state to `localStorage`. Local image previews use `FileReader` data URLs and remain in that browser. No `fetch`, form action, API route, or remote endpoint exists. Reset removes the occasion’s local key and restores the embedded source configuration.

## Security boundary

The portal is openly labeled as a portfolio preview. It is not presented as authentication. Real customer administration would be implemented separately and protected for customer-approved users. Static security headers deny framing, block plugins, restrict scripts and connections to the same origin, and disable sensitive browser permissions.

## Design system

The portfolio shell uses GTP blue, silver, black, and white. Each sample has its own tokens and structural identity: cinematic, hearth, editorial, archive, scrapbook, manifesto, folio, field guide, letter, service, reveal, or storybook. Shared accessibility primitives keep focus treatment, reduced motion, touch targets, and semantic structure consistent.
