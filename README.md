# Auto label test02

If your label is `[bug] The title have problem`, then the action will be add a 'bug' label for it.



## Usabe

```yaml
name: 'On issue'
on:
  issues:
    types: [opened, reopened, edited]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: CaiJingLong/action_auto_label@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
```
