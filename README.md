# Riyadvi Software Technologies Website Revamp

A working React + Three.js + Node/Express starter built to address the supplied Riyadvi Full Stack Developer assignment.

## What is included

- Multi-page React application with React Router
- Reusable service, portfolio, blog and career data structures
- Interactive 3D hero and 3D experiences on service/case-study pages
- Three.js + React Three Fiber + Drei
- GSAP entrance animation
- Lenis smooth scrolling
- Responsive desktop/tablet/mobile layouts
- Business Health Checkup multi-step UI
- Software Project Planning Guide lead form
- Contact and career application forms
- Node + Express backend API
- MongoDB/Mongoose persistence when `MONGODB_URI` is configured
- Basic admin dashboard UI
- README documentation

The supplied assignment explicitly requires a multi-page dynamic corporate website, meaningful 3D/advanced animation, backend APIs, database integration, lead forms, responsive design, Git history, README documentation and live deployment. The assignment also says the homepage, 3D hero, dynamic Services, dynamic Portfolio, lead generation and backend/database should be prioritized within the 3–5 day window.

## Run locally

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL, normally `http://localhost:5173`.

### Backend

Open a second terminal:

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

The API runs at `http://localhost:5000`.

If `MONGODB_URI` is empty, the API still starts, but submission endpoints will return a database-unavailable response. Add a MongoDB URI for persistence.

## Routes

- `/`
- `/services`
- `/services/:slug`
- `/portfolio`
- `/portfolio/:slug`
- `/about`
- `/blog`
- `/blog/:slug`
- `/careers`
- `/careers/:slug`
- `/contact`
- `/business-health-checkup`
- `/software-project-planning-guide`
- `/admin`

## API

- `POST /api/contact`
- `POST /api/consultation`
- `POST /api/health-checkup`
- `POST /api/lead-magnet`
- `POST /api/applications`
- `GET /api/health`

## AI Tools Used

**Tool:** ChatGPT  
**Purpose:** Architecture planning, React component scaffolding, debugging assistance, documentation and implementation support.  
**Example prompt:** "Build a reusable React architecture for a premium multi-page corporate technology website with dynamic services, portfolio case studies, forms and a Three.js hero."  
**Generated:** Initial project structure, components, data architecture, styling and API scaffold.  
**Manual changes:** Dependency versions, routing, error handling, responsive styling, API validation and project-specific content were reviewed and adjusted.  
**Why selected:** Fast iteration during a short development window while keeping the generated code understandable and editable.

## 3D and animation

Meaningful technologies used:
- Three.js
- React Three Fiber
- Drei
- GSAP
- Lenis

The 3D scene is used as a technology ecosystem visual rather than a random decorative object. The assignment asks for at least four technologies from its 3D/animation list and meaningful interactive visual experiences across multiple major sections/pages.

## Dynamic architecture

Services, projects, posts and jobs are stored in data modules and rendered through reusable templates. Adding another item means adding data rather than cloning an entire page component.

## Performance notes

- React Three Fiber device pixel ratio is capped
- 3D geometry is intentionally lightweight
- Mobile layouts reduce the scene height
- CSS is responsive
- The production version should add lazy route loading, compressed 3D assets, image optimization and Lighthouse testing before deployment

## Deployment

Frontend can be deployed to Vercel. Backend can be deployed to Render or Railway. Configure `VITE_API_URL` on the frontend and `MONGODB_URI`, `CLIENT_URL` on the backend.

## Important before submission

This is a working foundation, not a claim that every production integration is complete. Before sending it to the company:
1. Connect MongoDB.
2. Add authentication to the admin route.
3. Add real resume upload handling.
4. Add actual downloadable guide asset.
5. Add email/WhatsApp/Calendly integrations if required.
6. Add Git history with meaningful commits.
7. Run a production build and test every route.
8. Deploy frontend and backend and put the live URLs in this README.
