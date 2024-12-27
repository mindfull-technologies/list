# Collaborative List Maker

A collaborative list-making application built with [Next.js](https://nextjs.org/), [Postgres (Neon Serverless)](https://neon.tech/), and TypeScript. Users can create, share, and collaboratively edit lists in real-time.

---

## Features

-   **Create Lists**: Generate unique URLs for lists.
-   **Collaborative Editing**: Add items to lists with quantities and share the URL with others.
-   **Tech Stack**: TypeScript, Next.js, and Postgres (Neon Serverless).

---

## Getting Started

### Prerequisites

-   A Neon Database account ([sign up here](https://neon.tech/))

### Installation

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/mindfull-technologies/list
    cd list
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Set Up Environment Variables**:
   Add your Neon Database connection string to a `.env` file:

    ```bash
    DATABASE_URL=your_neon_connection_string
    ```

4. **Initialize the Database**:
   Run the following SQL commands:

    ```sql
    CREATE TABLE lists (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE list_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        list_id UUID REFERENCES lists(id),
        name TEXT NOT NULL,
        quantity INT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    );
    ```

5. **Run the Development Server**:
    ```bash
    npm run dev
    ```

---

## Usage

1. **Create a New List**:

    - Enter a title on the homepage to generate a unique list URL.

2. **Collaborate**:
    - Share the list URL and collaboratively add items with quantities.

---

## Technologies

-   **Frontend**: [Next.js](https://nextjs.org/) (App Router, Server Components)
-   **Database**: [Neon Database](https://neon.tech/) (PostgreSQL with serverless optimization)
-   **Backend**: API routes in Next.js
-   **Language**: TypeScript

---

## Contributing

We welcome contributions from the community! Here’s how to get started:

1. **Fork the repository**.
2. **Create a feature branch**:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. **Commit your changes**:
    ```bash
    git commit -m "Add feature: your-feature-name"
    ```
4. **Push your branch**:
    ```bash
    git push origin feature/your-feature-name
    ```
5. **Open a Pull Request**.

---

## Things to do

1. **Authentication**:

    - Integrate user authentication using [Auth.js](https://authjs.dev/).

2. **Real-Time Updates**:

    - Add real-time updates for collaborative list editing.
    - Preferred approaches:
        - **WebSockets**: Set up a WebSocket server.
        - **Supabase Realtime**: Integrate a pub/sub layer for notifications.

3. **AI-Powered List Item Recommendations**:

    - Provide AI-generated suggestions for list items based on:
        - User activity and contextual hints from the list title.
        - Similar previous lists.
    - Implement using OpenAI's GPT API and cache results for efficiency.

4. **AI-Powered Event Description Generator**:

    - Generate detailed event descriptions based on inputs like title, date, and location.
    - Integrate a "Generate Description" button for user customization.

5. **Role-Based Access Control (RBAC)**:

    - Define roles (e.g., owner, editor, viewer) for collaborative lists.

6. **UI Enhancements**:

    - Add visual indicators for real-time updates.
    - Improve responsiveness and error handling.

7. **Deployment**:

    - Optimize the app for production with CI/CD pipelines.

8. **Testing**:
    - Add unit tests for core features.
    - Conduct end-to-end (E2E) tests for real-time updates and AI functionalities.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For inquiries or feedback, open an issue or reach out to [hello@mindfulltechnologies.com](mailto:hello@mindfulltechnologies.com).

---

## Acknowledgements

-   [Next.js](https://nextjs.org/)
-   [Neon Database](https://neon.tech/)
-   [TypeScript](https://www.typescriptlang.org/)

---

## Community

We encourage the community to participate actively! If you have feature requests or suggestions, [create an issue](https://github.com/mindfull-technologies/list/issues). Let’s build something amazing together!
