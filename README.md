# Healing Meal Project
GDSC Solution Challenge 2024
<br>
- FrontEnd Repo : https://github.com/leemanjae02/HealingMeal-FrontEnd
- BackEnd Repo : https://github.com/zzdh8/healingmeal-back

# Member
| Backend | Frontend | PM |
| --------------- | --------------- | --------------- |
| Jinyong Hyun | Manjae Lee  | bojung Kim  |
| Inho Choi |

Jinyong Hyun|Inho Choi| Manjae Lee|bojung Kim|
|:---:|:---:|:---:|:---:|
|<img src= "https://github.com/leemanjae02/HealingMeal-FrontEnd/assets/144561017/48711f54-230b-43da-8cbc-e62da7a3d1ab" width="250">|
<img src="https://github.com/leemanjae02/HealingMeal-FrontEnd/assets/144561017/fdbf9d5d-04e2-4078-affc-5dabd62f32af" width="250">|
<img src="https://github.com/leemanjae02/HealingMeal-FrontEnd/assets/144561017/47264385-5bed-4f69-abd6-5c0dd9650625" width="250">|
<img  src="https://github.com/leemanjae02/HealingMeal-FrontEnd/assets/144561017/3be7d6e9-ae2a-47f1-8a54-32926a60f1f0" width="250">|
|Backend|Backend|Frontend|PM|



 
<br>

# Target UN-SDGs
## Goal 3. Good Health and Well-Being
<img width="351" alt="스크린샷 2024-02-15 오후 5 17 47" src="https://github.com/inhooo00/healingmeal-back/assets/129029251/c7af8650-49f7-4219-a119-04e8fd5355c0">

# About our solution
- Diabetes has established itself as one of the most significant diseases globally among modern people. 
- For these diabetic patients, we have planned ___**Healing Meal**___. It is a service that provides customized diets and personal diet management for type 2 diabetes patients. 
- Healing Meal does not merely recommend diets; it can create a diet based on the patient's preferences through surveys. 
- It generates a reasonable diet based on the patient's various tastes and current physical information. Furthermore, it also provides the efficacy of the diet.
- You can save and manage your preferred diet using the favorite feature.

# App Demo
<img width="1512" alt="스크린샷 2024-02-20 오후 11 28 01" src="https://github.com/leemanjae02/HealingMeal-FrontEnd/assets/144561017/85021836-0f20-4ab2-a26c-3dbe93acba6d">
<img width="1512" alt="스크린샷 2024-02-20 오후 11 35 21" src="https://github.com/leemanjae02/HealingMeal-FrontEnd/assets/144561017/5aecaa57-68b0-4c7e-a8ac-b6f658b48b6c">
<img width="1512" alt="스크린샷 2024-02-20 오후 11 35 33" src="https://github.com/leemanjae02/HealingMeal-FrontEnd/assets/144561017/4cb495a6-0374-450e-b726-b6de9a45b632">
<img width="1512" alt="스크린샷 2024-02-20 오후 11 28 40" src="https://github.com/leemanjae02/HealingMeal-FrontEnd/assets/144561017/a22bd163-b609-4e1a-90dd-b0157f226352">
<img width="1512" alt="스크린샷 2024-02-20 오후 11 30 21" src="https://github.com/leemanjae02/HealingMeal-FrontEnd/assets/144561017/0d952c53-065a-4564-825d-1e59cf3df6f1">
<img width="1512" alt="스크린샷 2024-02-20 오후 11 39 57" src="https://github.com/leemanjae02/HealingMeal-FrontEnd/assets/144561017/2cd503a7-bde7-4f69-ae52-d67ea74fc103">


# About Implementation
## Backend
### Tech Stack
- JDK-17
- Spring, Spring Boot
- Spring Data JDBC & JPA
- Spring Security, Spring Session JDBC
- MySQL
- Docker, Docker-compose
- JSON Simple, JSON DATA PARSING
- Spring Mail
- Spring AI
- Google Cloud Platform(compute engine, cloud sql, cloud storage, load balancer)

## Frontend
### Tech Stack
- React 
- Vercel
- mobX
- vite
- css module, less
- Axios

## Architecture 
![healingmeal_architecture](https://github.com/leemanjae02/HealingMeal-FrontEnd/assets/144561017/5bf2d67c-9e8c-4295-9e46-fd911631fe2b)


1. The Frontend Deployment was done through the Vercel cloud platform.
2. I create a Dockerfile to build an image of **HealingMeal**. And Push the image to the DockerHub.
3. The Compute Engine, an API of Google Cloud Platform, was used to create virtual machine instances.
4. Then, I create a docker-compose.yml file with informaion about Working Spring Boot(Cloud SQL, API-Key, Mail SMTP).
5. Finally, I can run a command like "docker compose up -d" to start HealingMeal application container.
6. In addition, I use Google Cloud's load balancer to manage the SSL certificate. So Everyone can access Our Service.

## ERD
<img width="566" alt="2024-02-23_2 22 45" src="https://github.com/leemanjae02/HealingMeal-FrontEnd/assets/144561017/b2bfae0d-bec5-4da5-8233-618be354270b">


# Introduction Video Link

# About use of LLM API
- When the diet for user is generated, it is customized for the user with breakfast, lunch, dinner, and two snacks.
- Additionally, If the user's diet information is sent through the API, the user can find out the efficacy of the diet by LLM.
- if Users read this efficacy information and prefer the diet, users can save the diet as a bookmark.
