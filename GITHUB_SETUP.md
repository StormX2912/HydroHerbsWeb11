# How to Push to GitHub

## Step 1: Create a New Repository on GitHub

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon in the top right → **New repository**
3. Fill in:
   - **Repository name**: `HydroHerbsWeb11` (or any name you prefer)
   - **Description**: (optional) "HydroHerbs Website - PERN Stack"
   - **Visibility**: Choose **Public** or **Private**
   - **DO NOT** initialize with README, .gitignore, or license (you already have these)
4. Click **Create repository**

## Step 2: Update Your Remote URL (if needed)

If you created a repository with a different name, update the remote:

```bash
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

Replace:
- `YOUR_USERNAME` with your GitHub username
- `YOUR_REPO_NAME` with your repository name

## Step 3: Add and Commit Your Changes

First, check what files have changed:

```bash
git status
```

If you have uncommitted changes:

```bash
# Add all changes
git add .

# Commit with a message
git commit -m "Add Supabase integration and VPS deployment guide"
```

## Step 4: Push to GitHub

```bash
# Push to GitHub
git push -u origin master
```

**Note**: If your default branch is `main` instead of `master`:

```bash
git push -u origin master:main
```

Or rename your local branch:

```bash
git branch -M main
git push -u origin main
```

## Step 5: Authenticate

GitHub may ask you to authenticate:
- **Personal Access Token** (recommended): Create one at GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
- Or use **GitHub CLI** (`gh auth login`)

## Quick Commands Summary

```bash
# Check status
git status

# Add all changes
git add .

# Commit
git commit -m "Your commit message"

# Push to GitHub
git push origin master
# or
git push origin main
```

## Troubleshooting

### "Repository not found"
- Make sure the repository exists on GitHub
- Check your GitHub username and repository name
- Verify you have access to the repository

### "Authentication failed"
- Create a Personal Access Token: https://github.com/settings/tokens
- Use the token as your password when pushing
- Or set up SSH keys for easier authentication

### "Permission denied"
- Make sure you're logged into GitHub
- Check if you have write access to the repository

