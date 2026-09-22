<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:0E75B6,100:6C63FF&height=180&section=header&text=Bhupinder%20Singh&fontSize=48&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=Backend%20Developer%20%7C%20Node.js%20%C2%B7%20NestJS%20%C2%B7%20Microservices&descAlignY=58&descSize=18" />

<p align="center">
  <a href="https://github.com/bhupinder759">
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1000&color=0E75B6&center=true&vCenter=true&width=650&lines=Backend+Developer+(Node.js+%2F+NestJS);25+microservices+over+Kafka+%26+gRPC;Payments%2C+wallets+%26+idempotent+systems;6M%2B+notifications+in+production;Open+to+global+remote+roles" alt="Typing SVG" />
  </a>
</p>

<p align="center"> 
  <a href="https://linkedin.com/in/bhupinder-singh-a5b554285"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a>
  <a href="mailto:bhupinderkarnawal@gmail.com"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" /></a> 
  <a href="https://www.youtube.com/@raisinghyt"><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" /></a>
  <img src="https://komarev.com/ghpvc/?username=bhupinder759&label=Profile%20Views&color=0e75b6&style=for-the-badge" />
</p>

---

## 👨‍💻 About Me

Backend developer with ~2.5 years of experience, working on **Node.js microservices**
that handle payments, wallets and notifications at scale. Most of what I do is about
making distributed flows **safe to repeat** — a duplicate webhook should never charge
a user twice, and a redelivered Kafka event should never credit someone twice.

- 🏢 **Currently:** Node.js Backend Developer at **BlueCS Limited**, working on **BlueEra** — an India-first super app with 100K+ Play Store downloads
- 🧩 **I own:** subscription plans, Razorpay payments & refunds, GST invoicing, the refer-and-earn wallet, and the notification service
- 🔭 **Learning now:** advanced TypeScript, system design, and DSA (public 8-month streak below)
- 🌏 **Looking for:** backend roles at larger scale — India or global remote
- 📊 **Outside code:** I follow crypto markets and build small trading tools for fun
- 🎥 **I also vlog** my journey on YouTube

---

## ⚙️ What I actually work on

```
BlueEra super app  →  ~25 independent Node.js microservices
                      each with its own MongoDB database

Communication      →  Kafka for events  ·  gRPC for direct calls
                      circuit breakers + timeouts so one slow
                      service cannot take the rest down

My services        →  subscriptions & payments (Razorpay)
                      GST invoicing with atomic invoice counters
                      refer-and-earn wallet on idempotent consumers
                      notifications — 6M+ push / SMS / in-app
```

---

## 🛠️ Tech Stack

**Backend**

<p align="left">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Microservices-FF6B6B?style=for-the-badge&logo=serverfault&logoColor=white" />
  <img src="https://img.shields.io/badge/gRPC-4285F4?style=for-the-badge&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white" />
  <img src="https://img.shields.io/badge/WebRTC-333333?style=for-the-badge&logo=webrtc&logoColor=white" />
</p>

**Data & Messaging**

<p align="left">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/Apache_Kafka-231F20?style=for-the-badge&logo=apachekafka&logoColor=white" />
  <img src="https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
</p>

**Cloud & DevOps**

<p align="left">
  <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonwebservices&logoColor=white" />
  <img src="https://img.shields.io/badge/Amazon_ECS-FF9900?style=for-the-badge&logo=amazonecs&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white" />
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" />
</p>

---

## 🚀 Featured Projects

| Project | What makes it interesting | Stack |
| :--- | :--- | :--- |
| **Crypto Analytics Dashboard** | One upstream exchange feed fanned out to every client over Redis Pub/Sub, instead of one connection per user. Automatic reconnection and throttled updates so one slow client cannot stall the stream. | `NestJS` `WebSockets` `Redis` |
| **Real-Time Communication Server** | WebRTC signalling — offer, answer and ICE exchange over room-based channels. The JWT is verified **inside the handshake**, so a client cannot join another user's room. Media flows peer to peer; the server only carries signalling. | `NestJS` `WebSockets` `WebRTC` |
| **Multi-Vendor Marketplace** | Full order lifecycle with **atomic stock updates** so two customers cannot both buy the last item, and an **idempotent payment callback** so a retried webhook cannot create a duplicate order. | `Node.js` `Express` `MongoDB` |
| **Healthcare Inventory System** | Medicine ordering with automatic stock deduction and low-stock alerts on every confirmed order, plus role-based access separating pharmacist and customer. | `NestJS` `MongoDB` `JWT` |

---

## 📈 GitHub Analytics

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=bhupinder759&show_icons=true&theme=tokyonight&hide_border=true&count_private=true&include_all_commits=true" width="48%" />
  <img src="https://streak-stats.demolab.com/?user=bhupinder759&theme=tokyonight&hide_border=true" width="48%" />
</p>

<p align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=bhupinder759&theme=tokyo-night&hide_border=true&area=true" width="97%" />
</p>

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=bhupinder759&layout=compact&theme=tokyonight&hide_border=true&langs_count=8" width="42%" />
  <img src="https://github-profile-trophy.vercel.app/?username=bhupinder759&theme=tokyonight&no-frame=true&no-bg=true&column=3&margin-w=10" width="52%" />
</p>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/bhupinder759/bhupinder759/output/snake-dark.svg" />
  <img width="100%" src="https://raw.githubusercontent.com/bhupinder759/bhupinder759/output/snake.svg" alt="Contribution snake" />
</picture>

---

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:6C63FF,100:0E75B6&height=120&section=footer" />
