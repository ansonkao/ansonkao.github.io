ansonkao.github.io
==================

Anson Kao's Homepage at www.ansonkao.com

## Deployment
Make changes to the `gatsby` branch:
```
$ git checkout gatsby
```
Deploy using this command:
```
$ npm run deploy
```
If the domain gets messed up, go to https://github.com/ansonkao/ansonkao.github.io/settings and reset the custom domain to https://www.ansonkao.com. See https://github.com/tschaub/gh-pages/issues/236 for more details.


## Scraping from Medium
Install `mediumexporter`:
```
$ npm install -g mediumexporter
```

Scrape to clipboard:
```
$ mediumexporter https://medium.com/p/export-your-medium-posts-to-markdown-b5ccc8cb0050 | pbcopy
```