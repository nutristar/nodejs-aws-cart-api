https://github.com/nutristar/nodejs-aws-cart-api/tree/task-9

Main tasks:
Dockerfile is prepared, image is building. Image size is minimized to be less than 500 MB.
Dockerfile is optimized. Files that change more often and commands that depend on them should be included later, files and commands that change less should be at the top.
Folders are added to .dockerignore, with explanations. At least 2 big directories should be excluded from build context. Elastic Beanstalk application is initialized.
Additional tasks
15 - Environment is created and the app is deployed to the AWS cloud. You must provide a link to your GitHub repo with Cart Service API or PR with created Dockerfile and related configurations.
15 - FE application is updated with Cart API endpoint. You must provide a PR with updates in your FE repository and OPTIONALLY link to deployed front-end app which makes proper API calls to your Cart Service.