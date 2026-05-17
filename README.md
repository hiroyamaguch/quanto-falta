<h3 align="center">
  Work Timer
</h3>

<p align="center">A simple countdown to track how much time you have left at work.</p>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/hiroyamaguch/quanto-falta?color=04D361">

  <a href="https://hiroyamaguch.vercel.app/">
    <img alt="Made by Pedro Yamaguchi" src="https://img.shields.io/badge/made%20by-Pedro%20Yamaguchi-04D361">
  </a>
</p>

## :memo: About Project
Work Timer calculates how much time you left to in your workday. Check it out at: https://quanto-falta.vercel.app/

## :wrench: Local setup

### Vercel Toolbar — `No project info found`

If you see the message `[vercel-toolbar] No project info found. Make sure you run vc link in your project directory.` when running `bun dev`, it means the local directory is not linked to the Vercel project in the format the toolbar expects.

Run:

```bash
bunx vercel link --project quanto-falta --yes
```

This creates `.vercel/project.json` with the `projectId` and `orgId` the toolbar needs.

Note: `bunx vercel link` (without `--project`) may create only `.vercel/repo.json` (the newer multi-project format), which the current version of `@vercel/toolbar` does not recognize. If that happens, either re-run with `--project quanto-falta --yes` or create `.vercel/project.json` manually using the IDs from `.vercel/repo.json`:

```json
{
  "projectId": "<id from repo.json>",
  "orgId": "<orgId from repo.json>"
}
```

The `.vercel/` folder is gitignored and should not be committed.