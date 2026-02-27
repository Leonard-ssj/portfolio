export const siteConfig = {
  name: "Leonardo Alonso Aldana",
  initials: "LA",
  role: {
    es: "Becario Arquitecto de TI | Arquitectura de Soluciones (Jr)",
    en: "IT Architecture Intern | Solutions Architecture (Jr)",
  },
  location: "CDMX, Mexico",
  email: "leonardoalonsoaldana@gmail.com",
  phone: "+52 55 4373 6457",
  github: "https://github.com/Leonard-ssj",
  linkedin: "https://linkedin.com/in/leonardoalonsoaldana",
  instagram: "https://www.instagram.com/leonard_developer/",
  tiktok: "https://www.tiktok.com/@leonard_developer",
  avatar: "/avatar.jpg",
  cv: "/cv.pdf",
  cvAts: "/cv_ats.docx",
}

export const content = {
  nav: {
    es: ["Inicio", "Sobre mi", "Habilidades", "Experiencia", "Proyectos", "Documentacion", "Notas", "Contacto", "Juego"],
    en: ["Home", "About", "Skills", "Experience", "Projects", "Documentation", "Notes", "Contact", "Game"],
  },
  navAnchors: ["hero", "about", "skills", "experience", "projects", "docs", "notes-preview", "contact", "play"],
  hero: {
    subtitle: {
      es: "Ingeniero en Sistemas enfocado en integracion y arquitectura de soluciones. Experiencia apoyando sistemas en produccion, validacion de APIs y trabajo colaborativo bajo metodologias agiles, con foco en claridad, calidad y entrega.",
      en: "Systems Engineer focused on integration and solutions architecture. Experience supporting production systems, validating APIs, and collaborating in Agile environments, with a focus on clarity, quality, and delivery.",
    },
    chips: {
      es: ["CDMX", "Scrum", "Integracion de APIs", "Google Cloud"],
      en: ["CDMX", "Scrum", "API Integration", "Google Cloud"],
    },
    buttons: {
      downloadCv: { es: "Descargar CV", en: "Download CV" },
      viewAtsDocx: { es: "CV ATS (DOCX)", en: "ATS CV (DOCX)" },
      viewAtsText: { es: "CV ATS (Texto)", en: "ATS CV (Text)" },
    },
  },
  about: {
    title: { es: "Sobre mi", en: "About Me" },
    text: {
      es: "Disfruto convertir necesidades en soluciones claras. En entornos de produccion he colaborado en integracion de APIs, validacion tecnica y soporte a ambientes en Google Cloud, documentando y dando seguimiento con Jira/Confluence. Mi estilo de trabajo prioriza orden, trazabilidad y documentacion que el equipo realmente use.",
      en: "I enjoy turning needs into clear solutions. In production environments, I’ve contributed to API integrations, technical validation, and Google Cloud environment support, documenting and tracking work in Jira/Confluence. My work style prioritizes structure, traceability, and documentation the team actually uses.",
    },
    frameworkTitle: { es: "Como trabajo", en: "How I work" },
    cards: {
      es: [
        { title: "Entender", description: "Requisitos, flujo end-to-end y dependencias" },
        { title: "Disenar", description: "Diagrama simple + responsabilidades por componente" },
        { title: "Alinear", description: "Documentacion + validacion con el equipo (Jira/Confluence/Postman)" },
      ],
      en: [
        { title: "Understand", description: "Requirements, end-to-end flow, and dependencies" },
        { title: "Design", description: "Simple diagram + responsibilities per component" },
        { title: "Align", description: "Documentation + validation with the team (Jira/Confluence/Postman)" },
      ],
    },
  },
  skills: {
    title: { es: "Habilidades", en: "Skills" },
    categories: {
      es: [
        { name: "Arquitectura y documentacion", items: ["Diagramas logico/fisico/integracion", "UML basico", "Requerimientos", "Manuales de usuario"] },
        { name: "Diagramacion", items: ["draw.io", "Lucidchart"] },
        { name: "Tecnologias", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"] },
        { name: "Diseno de sistemas", items: ["Arquitectura por capas", "Integracion API", "Separacion de responsabilidades", "Manejo de errores", "MVC"] },
        { name: "Backend (laboral)", items: ["Python (Flask)"] },
        { name: "Datos", items: ["SQL", "MySQL", "PostgreSQL (basico)"] },
        { name: "Cloud/DevOps", items: ["Google Cloud (apoyo)", "GitHub Actions/Workflows", "Jenkins (apoyo)", "Git", "Docker (basico)"] },
        { name: "Herramientas", items: ["Jira", "Confluence", "Postman"] },
        { name: "Metodologias", items: ["Scrum"] },
        { name: "Extra (proyectos)", items: ["Redis"] },
        { name: "Soft skills", items: ["Comunicacion", "Documentacion clara", "Pensamiento analitico", "Organizacion", "Proactividad", "Trabajo en equipo", "Atencion al detalle", "Ownership", "Gestion de stakeholders"] },
      ],
      en: [
        { name: "Architecture & Documentation", items: ["Logical/physical/integration diagrams", "Basic UML", "Requirements", "User manuals"] },
        { name: "Diagramming", items: ["draw.io", "Lucidchart"] },
        { name: "Technologies", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"] },
        { name: "System Design", items: ["Layered architecture", "API Integration", "Separation of concerns", "Error handling", "MVC"] },
        { name: "Backend (work)", items: ["Python (Flask)"] },
        { name: "Data", items: ["SQL", "MySQL", "PostgreSQL (basic)"] },
        { name: "Cloud/DevOps", items: ["Google Cloud (support)", "GitHub Actions/Workflows", "Jenkins (support)", "Git", "Docker (basic)"] },
        { name: "Tools", items: ["Jira", "Confluence", "Postman"] },
        { name: "Methodologies", items: ["Scrum"] },
        { name: "Extra (projects)", items: ["Redis"] },
        { name: "Soft skills", items: ["Communication", "Clear documentation", "Analytical thinking", "Organization", "Proactivity", "Teamwork", "Attention to detail", "Ownership", "Stakeholder management"] },
      ],
    },
  },
  experience: {
    title: { es: "Experiencia Laboral", en: "Work Experience" },
    items: {
      es: [
        {
          company: "CHUBB-CDS",
          role: "Becario Desarrollo de Software",
          location: "CDMX",
          period: "Abr 2025 - Actual",
          current: true,
          bullets: [
            "Implementacion y mantenimiento de funcionalidades en aplicacion empresarial en produccion (Flask/Angular).",
            "Integracion con APIs de proveedores externos; validacion de flujos y correcciones ante cambios.",
            "Apoyo a despliegues y administracion de ambientes en Google Cloud con GitHub Workflows; soporte en pipelines con Jenkins durante migracion.",
            "Colaboracion con equipos de QA/Desarrollo bajo Scrum, seguimiento de actividades y soporte a entregas.",
          ],
        },
        {
          company: "CHUBB-CDS",
          role: "Becario QA",
          location: "CDMX",
          period: "Nov 2024 - Mar 2025",
          current: false,
          bullets: [
            "Ejecucion de pruebas funcionales e integrales para validar flujos completos del sistema.",
            "Documentacion de incidencias con evidencia y trazabilidad, facilitando su correccion.",
            "Pruebas de APIs y validacion de flujos en canales (VoiceBots WhatsApp/Web) en escenarios reales.",
            "Participacion en ceremonias Scrum y presentacion de demos de avances/validaciones a equipo y stakeholders.",
          ],
        },
      ],
      en: [
        {
          company: "CHUBB-CDS",
          role: "Software Development Intern",
          location: "CDMX",
          period: "Apr 2025 - Present",
          current: true,
          bullets: [
            "Implemented and maintained features in a production enterprise application (Flask/Angular).",
            "Integrated external provider APIs, validating flows and fixing issues introduced by upstream changes.",
            "Supported Google Cloud deployments and environment operations using GitHub Workflows; assisted Jenkins pipelines during migration.",
            "Collaborated with QA and development teams under Scrum, tracking work and supporting releases.",
          ],
        },
        {
          company: "CHUBB-CDS",
          role: "QA Intern",
          location: "CDMX",
          period: "Nov 2024 - Mar 2025",
          current: false,
          bullets: [
            "Executed end-to-end functional and integration tests to validate complete user flows.",
            "Documented incidents with evidence and traceability to speed up resolution.",
            "Tested APIs and validated channel flows (VoiceBots WhatsApp/Web) in real scenarios.",
            "Participated in Scrum ceremonies and presented demos to the team and stakeholders.",
          ],
        },
      ],
    },
  },
  projects: {
    title: { es: "Proyectos", en: "Projects" },
    items: {
      es: [
        {
          title: "CRM Moderno (Fullstack)",
          type: "Fullstack / SaaS",
          status: "Publico",
          stack: ["React + TypeScript (Vite)", "Spring Boot", "MySQL", "JWT", "REST"],
          bullets: [
            "Arquitectura separada en Frontend/Backend, enfocada a un CRM modular.",
            "API RESTful con autenticacion basada en JWT y persistencia en MySQL.",
            "UI moderna para operaciones CRUD y flujos de trabajo tipicos de CRM.",
          ],
          links: [
            { label: "Repo Frontend", href: "https://github.com/Leonard-ssj/CRM-Frontend" },
            { label: "Repo Backend", href: "https://github.com/Leonard-ssj/CRM-Backend" },
          ],
        },
        {
          title: "Sistema de Agencia de Autos",
          type: "Fullstack / SaaS",
          status: "Publico",
          stack: ["Django", "PostgreSQL", "Tailwind CSS", "Triggers/SP", "Transacciones/Auditoria"],
          bullets: [
            "Sistema de gestion de ventas con enfoque en administracion avanzada de base de datos.",
            "Triggers, procedimientos almacenados, transacciones y auditorias para control y trazabilidad.",
            "Reportes analiticos y vistas para consulta y soporte a decisiones.",
          ],
          links: [
            { label: "Repo", href: "https://github.com/Leonard-ssj/sistema-agencia-autos" },
          ],
        },
        {
          title: "Sistema de Gestion de Proyectos (SaaS)",
          type: "Fullstack / SaaS",
          status: "En desarrollo",
          stack: ["Flask", "React", "Next.js", "JWT", "REST", "Multi-tenant"],
          bullets: [
            "SaaS multi-tenant con arquitectura de monolito modular y capas claras.",
            "Integraciones planeadas con servicios externos (Twilio, SendGrid, Stripe).",
            "Documentacion y validacion continua de endpoints y flujos.",
          ],
          links: [
            { label: "Repo", href: "https://github.com/Leonard-ssj/Sistema-Gestion-de-Proyectos" },
            { label: "Prototipo", href: "https://v0-project-management-frontend-lake.vercel.app/" },
          ],
        },
        {
          title: "Agenda360 (SaaS Empresarial)",
          type: "Fullstack / SaaS",
          status: "En construccion",
          stack: ["Next.js", "REST", "JWT", "Multi-tenant", "Cloud"],
          bullets: [
            "Plataforma de agenda y operacion para escenarios empresariales.",
            "Enfoque en seguridad, trazabilidad y escalabilidad desde el diseno.",
            "Roadmap: roles/permisos, integraciones y despliegue en nube.",
          ],
          links: [
            { label: "Prototipo", href: "https://agenda360demo.vercel.app/" },
          ],
        },
      ],
      en: [
        {
          title: "Modern CRM (Fullstack)",
          type: "Fullstack / SaaS",
          status: "Public",
          stack: ["React + TypeScript (Vite)", "Spring Boot", "MySQL", "JWT", "REST"],
          bullets: [
            "Separated Frontend/Backend architecture, focused on a modular CRM.",
            "RESTful API with JWT-based authentication and MySQL persistence.",
            "Modern UI for CRUD operations and typical CRM workflows.",
          ],
          links: [
            { label: "Frontend Repo", href: "https://github.com/Leonard-ssj/CRM-Frontend" },
            { label: "Backend Repo", href: "https://github.com/Leonard-ssj/CRM-Backend" },
          ],
        },
        {
          title: "Car Dealership Management System",
          type: "Fullstack / SaaS",
          status: "Public",
          stack: ["Django", "PostgreSQL", "Tailwind CSS", "Triggers/SP", "Transactions/Audit"],
          bullets: [
            "Sales management system showcasing advanced database administration techniques.",
            "Triggers, stored procedures, transactions, and audits for control and traceability.",
            "Analytical reports and views to support operational decisions.",
          ],
          links: [
            { label: "Repo", href: "https://github.com/Leonard-ssj/sistema-agencia-autos" },
          ],
        },
        {
          title: "Project Management System (SaaS)",
          type: "Fullstack / SaaS",
          status: "In progress",
          stack: ["Flask", "React", "Next.js", "JWT", "REST", "Multi-tenant"],
          bullets: [
            "Multi-tenant SaaS with a modular monolith approach and clear layering.",
            "Planned integrations with external services (Twilio, SendGrid, Stripe).",
            "Continuous documentation and validation of endpoints and flows.",
          ],
          links: [
            { label: "Repo", href: "https://github.com/Leonard-ssj/Sistema-Gestion-de-Proyectos" },
            { label: "Prototype", href: "https://v0-project-management-frontend-lake.vercel.app/" },
          ],
        },
        {
          title: "Agenda360 (Enterprise SaaS)",
          type: "Fullstack / SaaS",
          status: "Building",
          stack: ["Next.js", "REST", "JWT", "Multi-tenant", "Cloud"],
          bullets: [
            "Scheduling and operations platform designed for enterprise scenarios.",
            "Focus on security, traceability, and scalability from day one.",
            "Roadmap: roles/permissions, integrations, and cloud deployment.",
          ],
          links: [
            { label: "Prototype", href: "https://agenda360demo.vercel.app/" },
          ],
        },
      ],
    },
  },
  docs: {
    title: { es: "Documentacion y Diagramas", en: "Documentation & Diagrams" },
    subtitle: {
      es: "Incluyo estos entregables porque una buena solucion no solo funciona: tambien se entiende, se valida y se puede mantener. Aqui muestro mi enfoque de documentacion (requerimientos, diagramas, contratos API y colecciones) para reducir incertidumbre y mejorar la colaboracion.",
      en: "I include these deliverables because a good solution doesn't just work: it is understandable, verifiable, and maintainable. Here I show my documentation approach (requirements, diagrams, API contracts, and collections) to reduce uncertainty and improve collaboration.",
    },
    items: {
      es: [
        { title: "Manual de usuario", type: "PDF", href: "/docs/user-manual.pdf" },
        { title: "Documento de requerimientos", type: "PDF", href: "/docs/requirements.pdf" },
        { title: "Diagrama de flujo e integracion", type: "PNG", href: "/artifacts/architecture-diagram.png" },
        { title: "Postman collection", type: "JSON", href: "/docs/postman-collection.json" },
      ],
      en: [
        { title: "User Manual", type: "PDF", href: "/docs/user-manual.pdf" },
        { title: "Requirements Document", type: "PDF", href: "/docs/requirements.pdf" },
        { title: "Flow & Integration Diagram", type: "PNG", href: "/artifacts/architecture-diagram.png" },
        { title: "Postman Collection", type: "JSON", href: "/docs/postman-collection.json" },
      ],
    },
  },
  notesPreview: {
    title: { es: "Notas", en: "Notes" },
    subtitle: {
      es: "Incluyo esta seccion para compartir como pienso y trabajo: decisiones, patrones, integraciones y buenas practicas. Son apuntes cortos, pero accionables, que reflejan mi criterio tecnico.",
      en: "I include this section to share how I think and work: decisions, patterns, integrations, and best practices. Short, actionable notes that reflect my technical judgment.",
    },
    featured: {
      slug: "como-documento-una-solucion",
      title: {
        es: "Como documento una solucion",
        en: "How I document a solution",
      },
      summary: {
        es: "Mi proceso de documentacion: requerimientos, diagramas, contratos API, validacion y entregables.",
        en: "My documentation process: requirements, diagrams, API contracts, validation, and deliverables.",
      },
      date: "2025-05-01",
    },
    highlights: [
      "como-documento-una-solucion",
      "integracion-apis-externas",
      "jwt-roles-y-autorizacion",
      "multi-tenant-estrategia",
    ],
    cta: { es: "Ver notas", en: "View notes" },
  },
  contact: {
    title: { es: "Contacto", en: "Contact" },
    form: {
      name: { es: "Nombre", en: "Name" },
      email: { es: "Correo electronico", en: "Email" },
      message: { es: "Mensaje", en: "Message" },
      send: { es: "Enviar", en: "Send" },
      copyEmail: { es: "Copiar email", en: "Copy email" },
      copied: { es: "Copiado", en: "Copied" },
    },
    mapTitle: { es: "Ciudad de Mexico, Mexico", en: "Mexico City, Mexico" },
  },
  footer: {
    copyright: "Leonardo Alonso Aldana",
    backToTop: { es: "Volver arriba", en: "Back to top" },
  },
  resume: {
    title: { es: "Curriculum Vitae", en: "Resume" },
    downloadPdf: { es: "Descargar CV (PDF)", en: "Download CV (PDF)" },
    downloadDocx: { es: "Descargar CV ATS (DOCX)", en: "Download ATS CV (DOCX)" },
    atsNote: {
      es: "Usa la version ATS para portales de empleo. La version disenada es para reclutadores.",
      en: "Use the ATS version for job portals. The designed version is for recruiters.",
    },
    atsTitle: { es: "Vista previa ATS", en: "ATS Preview" },
    atsContent: `LEONARDO ALONSO ALDANA
Becario Arquitecto de TI | Arquitectura de Soluciones (Jr)
CDMX, Mexico | leonardoalonsoaldana@gmail.com | +52 55 4373 6457

EXPERIENCIA
CHUBB-CDS - Becario Desarrollo de Software | CDMX | Abr 2025 - Actual
- Implementacion y mantenimiento de funcionalidades en produccion (Flask/Angular).
- Integracion con APIs de proveedores externos.
- Apoyo a despliegues en Google Cloud con GitHub Workflows.
- Trabajo bajo Scrum.

CHUBB-CDS - Becario QA | CDMX | Nov 2024 - Mar 2025
- Pruebas funcionales e integrales end-to-end.
- Documentacion de incidencias con evidencia.
- Validacion de APIs y canales (VoiceBots WhatsApp/Web).

HABILIDADES
Arquitectura: Diagramas logico/fisico/integracion, UML, Requerimientos
Backend: Python (Flask)
Datos: SQL, MySQL, PostgreSQL
Cloud/DevOps: Google Cloud, GitHub Actions, Jenkins, Git, Docker
Herramientas: Jira, Confluence, Postman
Metodologias: Scrum
`,
  },
  notes: {
    title: { es: "Notas", en: "Notes" },
    subtitle: {
      es: "Apuntes cortos sobre arquitectura, integraciones y buenas practicas: lo que aprendo en proyectos y aplico en produccion.",
      en: "Short notes on architecture, integrations, and best practices: what I learn from projects and apply in production.",
    },
    searchPlaceholder: { es: "Buscar notas...", en: "Search notes..." },
    posts: [
      {
        slug: "como-documento-una-solucion",
        title: { es: "Como documento una solucion", en: "How I document a solution" },
        summary: {
          es: "Mi proceso de documentacion: requerimientos, diagramas, contratos API, validacion y entregables.",
          en: "My documentation process: requirements, diagrams, API contracts, validation, and deliverables.",
        },
        date: "2025-05-01",
        category: { es: "Proceso", en: "Process" },
        content: {
          es: `# Como documento una solucion

Documentar una solucion no es solo escribir texto: es crear un mapa que otros (y tu yo futuro) puedan seguir para entender que se construyo, por que y como.

## 1. Requerimientos

Todo empieza con entender el problema. Escribo los requerimientos funcionales y no funcionales de forma clara y medible. Uso plantillas simples que incluyen:

- **Contexto del problema**: que necesita el negocio.
- **Alcance**: que entra y que no entra en la solucion.
- **Criterios de aceptacion**: como sabemos que esta hecho.

## 2. Diagramas

Los diagramas son el lenguaje visual de la arquitectura. Uso herramientas como draw.io y Lucidchart para crear:

- **Diagrama logico**: componentes principales y sus relaciones.
- **Diagrama fisico**: infraestructura, servidores, bases de datos.
- **Diagrama de integracion**: APIs, flujos de datos entre servicios.

## 3. Contratos API

Para cada integracion, documento:

- Endpoints (metodo, URL, parametros).
- Request/response de ejemplo.
- Codigos de error esperados.
- Autenticacion requerida.

Esto lo valido con Postman antes de pasar a desarrollo.

## 4. Validacion

Antes de entregar, valido que:

- Los diagramas reflejan la implementacion real.
- Los contratos API coinciden con lo implementado.
- La documentacion es entendible por alguien que no participo en el desarrollo.

## 5. Entregables

Al final, el paquete de documentacion incluye:

- Documento de requerimientos.
- Diagramas actualizados.
- Coleccion de Postman.
- Manual de usuario (si aplica).

Este proceso no es rigido: se adapta al tamano del proyecto. Pero mantener esta estructura me ha ayudado a entregar con claridad y reducir malentendidos.`,
          en: `# How I document a solution

Documenting a solution isn't just writing text: it's creating a map that others (and your future self) can follow to understand what was built, why, and how.

## 1. Requirements

Everything starts with understanding the problem. I write functional and non-functional requirements clearly and measurably. I use simple templates that include:

- **Problem context**: what the business needs.
- **Scope**: what's included and what's not.
- **Acceptance criteria**: how we know it's done.

## 2. Diagrams

Diagrams are the visual language of architecture. I use tools like draw.io and Lucidchart to create:

- **Logical diagram**: main components and their relationships.
- **Physical diagram**: infrastructure, servers, databases.
- **Integration diagram**: APIs, data flows between services.

## 3. API Contracts

For each integration, I document:

- Endpoints (method, URL, parameters).
- Example request/response.
- Expected error codes.
- Required authentication.

I validate this with Postman before moving to development.

## 4. Validation

Before delivering, I validate that:

- Diagrams reflect the actual implementation.
- API contracts match what was implemented.
- Documentation is understandable by someone who didn't participate in development.

## 5. Deliverables

In the end, the documentation package includes:

- Requirements document.
- Updated diagrams.
- Postman collection.
- User manual (if applicable).

This process isn't rigid: it adapts to the project size. But maintaining this structure has helped me deliver with clarity and reduce misunderstandings.`,
        },
      },
      {
        slug: "integracion-apis-externas",
        title: {
          es: "Lecciones al integrar APIs externas",
          en: "Lessons from integrating external APIs",
        },
        summary: {
          es: "Errores comunes, estrategias de manejo de errores y como validar contratos API antes de ir a produccion.",
          en: "Common mistakes, error handling strategies, and how to validate API contracts before going to production.",
        },
        date: "2025-06-15",
        category: { es: "Tecnico", en: "Technical" },
        content: {
          es: `# Lecciones al integrar APIs externas

Integrar APIs de terceros es una de las tareas mas comunes en desarrollo, pero tambien una de las que mas sorpresas trae. Aqui comparto lo que he aprendido trabajando con integraciones en produccion.

## 1. Nunca confies ciegamente en la documentacion

La documentacion de APIs externas puede estar desactualizada o incompleta. Siempre valida con peticiones reales antes de escribir codigo.

- **Usa Postman** para probar cada endpoint manualmente.
- Compara la respuesta real con la documentada.
- Documenta las diferencias que encuentres.

## 2. Manejo de errores robusto

Las APIs externas pueden fallar de muchas formas: timeouts, respuestas inesperadas, cambios sin aviso. Implementa:

- **Reintentos con backoff exponencial**: no bombardees el servicio.
- **Timeouts explicitos**: no dejes que una llamada bloquee tu sistema.
- **Logging detallado**: registra request, response y headers.
- **Fallbacks**: que debe hacer tu sistema si la API no responde.

## 3. Valida el contrato antes de produccion

Antes de desplegar, asegurate de:

- Validar el schema de respuesta (no solo el status code).
- Probar con datos reales o lo mas cercano posible.
- Verificar autenticacion y permisos en el ambiente correcto.
- Confirmar rate limits y cuotas.

## 4. Monitoreo post-despliegue

Despues de lanzar, no te olvides de la integracion:

- Configura alertas para errores recurrentes.
- Revisa logs periodicamente.
- Mantente al dia con changelogs del proveedor.

## Conclusion

La clave es no asumir que todo funcionara perfecto. Planifica para el fallo, documenta todo y valida antes de confiar.`,
          en: `# Lessons from integrating external APIs

Integrating third-party APIs is one of the most common tasks in development, but also one that brings the most surprises. Here I share what I've learned working with integrations in production.

## 1. Never blindly trust the documentation

External API documentation can be outdated or incomplete. Always validate with real requests before writing code.

- **Use Postman** to test each endpoint manually.
- Compare the actual response with the documented one.
- Document the differences you find.

## 2. Robust error handling

External APIs can fail in many ways: timeouts, unexpected responses, unannounced changes. Implement:

- **Retries with exponential backoff**: don't bombard the service.
- **Explicit timeouts**: don't let a call block your system.
- **Detailed logging**: log request, response, and headers.
- **Fallbacks**: what should your system do if the API doesn't respond.

## 3. Validate the contract before production

Before deploying, make sure to:

- Validate the response schema (not just the status code).
- Test with real data or as close as possible.
- Verify authentication and permissions in the correct environment.
- Confirm rate limits and quotas.

## 4. Post-deployment monitoring

After launching, don't forget about the integration:

- Set up alerts for recurring errors.
- Review logs periodically.
- Stay up to date with the provider's changelogs.

## Conclusion

The key is not to assume everything will work perfectly. Plan for failure, document everything, and validate before trusting.`,
        },
      },
      {
        slug: "jwt-roles-y-autorizacion",
        title: {
          es: "JWT, roles y autorizacion sin dolor",
          en: "JWT, roles, and authorization without pain",
        },
        summary: {
          es: "Checklist practico para implementar autenticacion JWT y permisos por rol, evitando errores tipicos en APIs.",
          en: "A practical checklist for JWT auth and role-based permissions, avoiding common API pitfalls.",
        },
        date: "2025-07-10",
        category: { es: "Tecnico", en: "Technical" },
        content: {
          es: `# JWT, roles y autorizacion sin dolor

Cuando un sistema crece, la seguridad deja de ser un “feature” y se vuelve una base. JWT funciona muy bien, pero solo si se implementa con disciplina.

## 1. Define el modelo de permisos primero

Antes de escribir codigo, aclaro:

- **Roles**: Admin, Manager, User, etc.
- **Acciones**: crear, leer, actualizar, eliminar.
- **Recursos**: usuarios, proyectos, tareas, etc.
- **Reglas**: que puede hacer cada rol sobre cada recurso.

Esto evita que termines con “if (isAdmin)” por todos lados.

## 2. Token con claims minimos

En el JWT solo incluyo lo necesario:

- subject (user id)
- roles (o scopes)
- expiracion (exp)
- tenant (si aplica)

Evito meter datos que cambian seguido (nombre, correo) porque el token se vuelve inconsistente.

## 3. Separar autenticacion de autorizacion

Autenticacion: validar que el token es valido.

Autorizacion: validar que el usuario tiene permiso para la accion. Idealmente:

- middleware/filtros para autenticar
- guards/decorators para autorizar (por rol o scope)

## 4. Manejo de expiracion y refresh

Buenas practicas:

- access token corto (ej. 15 min)
- refresh token mas largo (ej. dias)
- revocacion si se detecta compromiso

Si no usas refresh tokens, al menos maneja correctamente el re-login.

## 5. Errores consistentes y auditables

Respuestas claras:

- 401 si no hay token o es invalido
- 403 si hay token, pero no hay permisos

Y logs/auditoria de intentos (sin guardar tokens completos).

## Conclusion

JWT + roles funciona bien cuando el modelo esta claro, los claims son minimalistas y la autorizacion vive en una capa consistente. Eso reduce bugs, huecos y tiempo de mantenimiento.`,
          en: `# JWT, roles, and authorization without pain

As a system grows, security stops being a “feature” and becomes a foundation. JWT works great, but only if implemented with discipline.

## 1. Define the permission model first

Before writing code, I clarify:

- **Roles**: Admin, Manager, User, etc.
- **Actions**: create, read, update, delete.
- **Resources**: users, projects, tasks, etc.
- **Rules**: what each role can do on each resource.

This prevents “if (isAdmin)” scattered everywhere.

## 2. Keep token claims minimal

In the JWT I only include what’s necessary:

- subject (user id)
- roles (or scopes)
- expiration (exp)
- tenant (if applicable)

I avoid putting frequently changing data (name, email) to prevent inconsistencies.

## 3. Separate authentication from authorization

Authentication: verify the token is valid.

Authorization: verify the user has permission. Ideally:

- middleware/filters for authentication
- guards/decorators for authorization (role/scope)

## 4. Handle expiration and refresh properly

Best practices:

- short-lived access token (e.g., 15 min)
- longer refresh token (e.g., days)
- revocation if compromise is detected

If you don’t use refresh tokens, at least handle re-login cleanly.

## 5. Consistent, auditable errors

Clear responses:

- 401 for missing/invalid token
- 403 for valid token but insufficient permissions

And logs/audits of attempts (never store full tokens).

## Conclusion

JWT + roles works best when the model is clear, claims are minimal, and authorization lives in a consistent layer. That reduces bugs, security gaps, and maintenance time.`,
        },
      },
      {
        slug: "multi-tenant-estrategia",
        title: {
          es: "Multi-tenant: estrategia, limites y trampas comunes",
          en: "Multi-tenant: strategy, boundaries, and common pitfalls",
        },
        summary: {
          es: "Como separar datos, configurar permisos y evitar fugas entre tenants sin complicar toda la arquitectura.",
          en: "How to separate data, enforce permissions, and avoid tenant leaks without overcomplicating the architecture.",
        },
        date: "2025-08-05",
        category: { es: "Arquitectura", en: "Architecture" },
        content: {
          es: `# Multi-tenant: estrategia, limites y trampas comunes

Multi-tenant no es solo “agregar tenant_id a las tablas”. Es un conjunto de decisiones de seguridad, limites de datos y experiencia operativa.

## 1. Define el tipo de multi-tenant

Las opciones mas comunes:

- **Shared DB + shared schema**: todas las tablas comparten esquema y se separa por tenant_id.
- **Shared DB + schema por tenant**: cada tenant tiene su propio esquema.
- **DB por tenant**: aislamiento maximo, mas complejidad operativa.

No hay una unica respuesta: depende de compliance, costos, volumen y nivel de riesgo.

## 2. El tenant debe estar en el contexto, no “en el request”

Regla: la aplicacion debe saber el tenant antes de ejecutar consultas.

Ejemplos:

- subdominio: tenant.tudominio.com
- header controlado por gateway (no por el cliente)
- mapeo por organizacion del usuario autenticado

El objetivo es evitar que un usuario cambie el tenant_id “a mano”.

## 3. Aislamiento a nivel de consultas

Si usas shared schema:

- agrega tenant_id en tablas “tenant-owned”
- indexa por (tenant_id, id) para queries rapidas
- crea helpers/ORM scopes para forzar el filtro por tenant

Idealmente, el filtro tenant_id se aplica automaticamente (middleware/capa de repositorio).

## 4. Autorizacion por tenant (no solo por rol)

Un usuario puede ser Admin, pero solo dentro de su tenant.

Modelo recomendado:

- user pertenece a tenant(s)
- roles/scopes se evalua dentro del tenant actual
- valida tenant_id en cada accion sensible

## 5. Evita fugas con pruebas y “guardrails”

Pruebas que siempre incluyo:

- un usuario de Tenant A no puede leer/escribir recursos de Tenant B
- endpoints que devuelven listas siempre filtran por tenant
- logs/auditoria con tenant_id para investigar incidentes

## Conclusion

Un buen multi-tenant se siente invisible para el usuario, pero es muy estricto por dentro: tenant en el contexto, filtros consistentes y autorizacion por tenant. Eso reduce fugas de datos y hace la plataforma escalable.`,
          en: `# Multi-tenant: strategy, boundaries, and common pitfalls

Multi-tenant is not just “adding tenant_id to tables”. It’s a set of security decisions, data boundaries, and operational trade-offs.

## 1. Define the multi-tenant model

Common options:

- **Shared DB + shared schema**: same schema for all tenants, separated by tenant_id.
- **Shared DB + schema per tenant**: each tenant has its own schema.
- **DB per tenant**: maximum isolation, more operational complexity.

There is no single best choice: it depends on compliance, cost, volume, and risk tolerance.

## 2. Tenant should live in context, not “in the request”

Rule: the app must know the tenant before executing queries.

Examples:

- subdomain: tenant.yourdomain.com
- header controlled by a gateway (not the client)
- mapping via the authenticated user’s organization

The goal is preventing users from “editing” tenant_id manually.

## 3. Query-level isolation

If you use a shared schema:

- add tenant_id to tenant-owned tables
- index by (tenant_id, id) for fast queries
- create helpers/ORM scopes to enforce tenant filters

Ideally, tenant filtering is automatic (middleware/repository layer).

## 4. Tenant-scoped authorization (not just roles)

A user can be Admin, but only within their tenant.

Recommended model:

- user belongs to tenant(s)
- roles/scopes are evaluated inside the current tenant
- validate tenant_id on every sensitive action

## 5. Prevent leaks with tests and guardrails

Tests I always include:

- Tenant A user cannot read/write Tenant B resources
- list endpoints always filter by tenant
- logs/audits include tenant_id to investigate incidents

## Conclusion

Good multi-tenant feels invisible to users but is strict internally: tenant in context, consistent filters, and tenant-scoped authorization. That reduces data leaks and makes the platform scalable.`,
        },
      },
    ],
  },
}
