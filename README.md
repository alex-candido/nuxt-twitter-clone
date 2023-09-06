<img alt="banner" src="/public/images/twitter-banner.png" />

# Nuxt Full Stack Twitter Clone

The "Nuxt Full Stack Twitter Clone" project is a complete web application built from scratch using technologies such as TypeScript, Vue 3, Nuxt 3, Pinia, NuxtAuth, Prisma, MongoDB and Tailwind CSS. The aim of the project is to replicate the main features of Twitter, providing a similar experience to users.

## Main features:

- Authentication System: Using NuxtAuth/Sidebase, the project offers a secure authentication system for users, allowing access to specific functionalities only for authenticated users.

- Notification System: Users will receive real-time notifications about relevant activities like mentions, likes and new followers.

- Image Upload: Image upload functionality is implemented using the useDropzone references feature, allowing users to add images to their posts.

- Backend Image Bank: Using Cloudinary, an image hosting service, the project stores the images in the backend, ensuring scalability and efficiency.

- Prisma ORM with MongoDB: Prisma is used as an ORM (Object-Relational Mapping) for MongoDB, facilitating interaction with the database and performing queries.

- Responsive Layout: The project is developed using Tailwind CSS, a highly customizable and responsive CSS framework, ensuring a consistent experience across devices.

- 1 to Many Relationships: The system allows users to publish posts and relate them to their profiles, establishing a 1 to many relationship.

- Many-to-Many Relationships: Users can interact with posts through comments and responses, establishing a many-to-many relationship.

- Follow Functionality: Users can follow other users and view the posts they follow in their main feed.

- Comments/Responses: Users can interact with the posts through comments and responses, promoting discussions on the topics addressed.

- Likes Functionality: Users can like other users' posts, demonstrating their interest and engagement.

- Post Deletion and Notifications Functionality: Users have the ability to delete their own posts, providing control over published content.

The project follows the best development practices, using TypeScript to ensure code security and standardization. In addition, Vue 3, Nuxt 3, Pinia, Prisma, MongoDB and NuxtAuth/Sidebase technologies are employed to provide a solid foundation for development, ensuring efficiency, scalability and security.

Acesse [Twitter App](https://nuxt-twitter-clone-six.vercel.app/)

## 🚀 Approaches

- [TypeScript](https://www.typescriptlang.org)
- [Vue 3](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com)
- [Nuxt 3](https://nuxt.com/)
- [Pinia](https://pinia.vuejs.org)
- [Prisma](Prisma)
- [Mongo](https://www.mongodb.com)
- [NuxtAuth](https://nuxt.com/modules/nuxt-auth)

## 📌 Was used

#### Project Dependencies

- @nuxt/devtools: latest,
- @nuxt/image: ^1.0.0-rc.1,
- @nuxtjs/eslint-config-typescript: ^12.0.0,
- @nuxtjs/tailwindcss: ^6.8.0,
- @pinia-plugin-persistedstate/nuxt: ^1.1.1,
- @sidebase/nuxt-auth: ^0.6.0-beta.4,
- @types/bcrypt: ^5.0.0,
- @types/formidable: ^3.4.2,
- @types/node: ^18.17.3,
- @typescript-eslint/parser: ^6.4.0,
- eslint: ^8.47.0,
- eslint-config-prettier: ^9.0.0,
- eslint-plugin-prettier: ^5.0.0,
- nuxt: ^3.6.5,
- nuxt-icon: ^0.5.0,
- prettier: ^3.0.2,
- typescript: ^5.1.6

#### Development Dependencies

- @pinia/nuxt: ^0.4.11,
- @prisma/client: ^5.1.1,
- @vueuse/core: ^10.3.0,
- @vueuse/nuxt: ^10.3.0,
- bcrypt: ^5.1.1,
- cloudinary: 1.30.0,
- date-fns: ^2.30.0,
- formidable: ^2.1.1,
- mongodb: ^5.7.0,
- next-auth: 4.21.1,
- pinia: ^2.1.6,
- pinia-plugin-persistedstate: ^3.2.0,
- prisma: ^5.1.1,
- vue3-dropzone: ^2.1.0

## ▶️ Starting the application

#### Prerequisites

- Node version v18.15.0

- Clone this repository
```
$ git clone https://github.com/alex-candido/nuxt-twitter-clone.git
```
- Install dependencies
```
$ yarn add
```

- Setup .env file
```
DATABASE_URL=""
NUXTAUTH_JWT_SECRET=""
NUXTAUTH_SECRET=""

CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

AUTH_ORIGIN=
```
- Start Prisma
```
$ yarn prisma generate

$ yarn prisma db push
```

- Start the project
```
$ yarn dev
```

<img src="/public/images/home-page.png" alt="home">
<img src="/public/images/profile-page.png" alt="profile">

Made by Alex Cândido [Linkedin](https://www.linkedin.com/in/alexcndd/)
