# Ecommerce Website

An ecommerce website built using Vue.js, Node.js, MongoDB, AWS, Algolia, Nuxt, Stripe, and PayPal.

## Features
- Vue.js for building user interfaces
- Node.js as the runtime environment for server-side JavaScript code
- MongoDB as the database for storing product and customer data as well as Amazon S3 for storing images
- AWS for hosting the application in a production environment
- Algolia for providing powerful search capabilities
- Nuxt for connecting Vue components and organizing the application structure
- Stripe and PayPal as the payment methods for customers to complete transactions

## Getting Started
1. Clone the repository to your local machine

2. Install dependencies

3. Start the development server

4. Open a web browser and navigate to `http://localhost:3000`

## Deployment
The application is deployed to AWS using the following steps:

1. Build the production-ready application

2. Deploy to AWS

## Configuration
The following environment variables must be set before starting the application:
- `MONGODB_URI`: The connection string for the MongoDB database
- `ALGOLIA_APP_ID`: The Algolia app ID
- `ALGOLIA_API_KEY`: The Algolia API key
- `STRIPE_PUBLISHABLE_KEY`: The Stripe publishable key
- `STRIPE_SECRET_KEY`: The Stripe secret key
- `PAYPAL_CLIENT_ID`: The PayPal client ID

## Built With
- [Vue.js](https://vuejs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [AWS](https://aws.amazon.com/)
- [Algolia](https://www.algolia.com/)
- [Nuxt](https://nuxtjs.org/)
- [Stripe](https://stripe.com/)
- [PayPal](https://paypal.com)

  ### Other NPM packages 
  - [aws-sdk](https://www.npmjs.com/package/aws-sdk)
  - [morgan](https://www.npmjs.com/package/morgan)
  - [dotenv](https://www.npmjs.com/package/dotenv)
  - [mongoose](https://www.npmjs.com/package/mongoose)
  - [multer](https://www.npmjs.com/package/multer)
  - [body-parser](https://www.npmjs.com/package/body-parser)
  - [multer-s3](https://www.npmjs.com/package/multer-s3)

## Contributing
Contributions are welcome! Please open a pull request and describe the changes you would like to make.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
