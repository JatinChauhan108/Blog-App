# Setting up required files and folders
- Install the required dependencies.
- Make a file for environment variables (variables which are required by the frontend but are kept separate from frontend so that sensitive information is not leaked from frontend to the browser).
- Make sure that the file is in the root directory i.e., directly under the project folder.
- Environment variables are never shipped to production or github, hence .env file is added to .gitignore.
- But, if we wish to specify what are the environment variables, while deploying in open source without exposing their values, we can create a new file .env.sample where we write the same content as .env without mentioning the values.
- The way of writing the names of ENV variables and accessing them in the frontend depend upon the framework, libraries, and platform, so it is different in create react app, vite, vercel, firebase, etc.
- A better practice to access the environment variables, especially in the production grade apps is to create a config file in src folder and import all the environment variables there, so that any component can access them from the config file.
- All the environment variables must be of string type, hence they are converted to string before using, in the config file.
- Usually the .env file is loaded only once, so we would have to restart our project in case we make some changes to the .env file.

# Setting up Appwrite
- Make a new project and add the project id and api endpoint url to the environment variables.
- Make a database inside the project.
- Make collections (tables) inside the database.
- Give suitable permissions in the setting of the collection.
- Make the necessary attributes in the collection.
- Make an index for the filtering purposes.
- Make a bucket in storage and set its permissions as well.

# Databases
- Only indexes can be used in queries, so in order to use an attribute in a query, one should make an index for the same.

# Designing production-grade components
- Some components (like container in this project) are created with some default properties, which are reused at multiple places(with some changed props,if required) so that, whenever we want to make a change in the property of that reused component, we shall make a change in only one file and that would be propagated everywhere else.
- For the same reason, we have made Input and Button components separately in a file, so that they can be reused

## forwardRef
Suppose we make an Input component in a separate file that may be used everywhere for email fields, password fields, etc. then, we would want to get access to the DOM node (say input tag) of the component Input inside the parent component where we are utilizing Input, then we use forwardRef
- forwardRef returns a function which can be passed with a ref prop and ref can be used inside the parent element to get access to that specific DOM in which ref attribute is passed.
- ref is declared in parent element by useRef() hook

# React Hook Form
- used to manage and validate the state of data in a form without the need of useState
- Mainly we use register and handleSubmit returned by the useForm() hook.
- register is used for registering our component into the hook.
- It makes the value of our component available for both the form validation and submission.
- A name must be passed as a key for the registration process in the arguments of register.
```
<Input {...register("name of the field"), {required : true, maxLength : 20}} />
```
- handleSubmit is used to validate the inputs before invoking the function (i.e., onSubmit function) passed inside it
```
<form onSubmit = {handleSubmit(onSubmit)}>
```
- Sometimes, we may need to match the pattern of the input, for which matchPattern may be used. The pattern is matched with a RegEx(regular expression). You may find the appropriate RegEX from the website RegExr.