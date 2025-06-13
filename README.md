# PZ Modpack Creator

A web application to create and manage modpacks for the game *Project Zomboid*.

## Installation

To set up the project locally, follow these steps:

1. **Ensure pnpm is installed**: If you don't have pnpm installed, install it globally using npm:
   ```
   npm install -g pnpm
   ```

2. Clone the repository:
   ```
   git clone https://github.com/TheMath123/pz-modpack-creator.git
   ```

3. Navigate to the project directory:
   ```
   cd pz-modpack-creator
   ```

4. Install dependencies using pnpm:
   ```
   pnpm install
   ```

5. Start the development server:
   ```
   pnpm run dev
   ```

Then, open http://localhost:3000 in your browser.

## Deployment

You can deploy this application on [Vercel](https://vercel.com/) by following these steps:

1. Go to [Vercel](https://vercel.com/) and log in or sign up.
2. Click on "New Project" and connect your GitHub account.
3. Select this repository and deploy.

Vercel automatically detects the use of pnpm (via the `pnpm-lock.yaml` file) and will run `pnpm install` during the build process, so no additional configuration is needed.

## Usage

With the application running, you can:

- Browse available mods for *Project Zomboid*.
- Select mods to include in your modpack.
- Configure modpack settings (if applicable).
- Generate and download your modpack.

**Note**: Detailed usage instructions will be added as the application develops.

## Resources

- [Official Project Zomboid Website](https://projectzomboid.com/)
- [Project Zomboid Modding Wiki](https://pzwiki.net/wiki/Modding)

## Contributions

Contributions are welcome! Please fork the repository and submit pull requests for improvements or new features.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact

For any questions or feedback, you can contact me on X: [@themat_123](https://x.com/themat_123)