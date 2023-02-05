# System dependencies

verified on the following setup

- Ruby 3.1.3
- Node v16.14.0
- Yarn 1.22.19
- PostgreSQL 12.9

requires postgres to run on local

```
brew install postgresql@12
```

# Setup

1. Clone the repo

```
git clone git@github.com:tarunvelli/ask_orwell.git
```

2. Make sure you have installed the required dependencies

3. Setup app

```
bin/setup
```

4. Add `OPENAI_API_KEY` to .env

5. Add `book.pdf` in `lib/assets`

6. Generate embeddings

```
bundle exec rake generate_page_embeddings["book.pdf"]
```
Note: If you're using zsh, add backslash before brackets
```
bundle exec rake generate_page_embeddings\["book.pdf"\]
```

7. Start app
```
bin/dev
```


