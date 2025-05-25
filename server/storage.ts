import { 
  users, 
  projects, 
  templates, 
  generations,
  type User, 
  type InsertUser,
  type Project,
  type InsertProject,
  type Template,
  type InsertTemplate,
  type Generation,
  type InsertGeneration
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined>;

  // Project operations
  getProject(id: number): Promise<Project | undefined>;
  getProjectsByUser(userId: number): Promise<Project[]>;
  createProject(project: InsertProject & { userId: number }): Promise<Project>;
  updateProject(id: number, updates: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;

  // Template operations
  getTemplate(id: number): Promise<Template | undefined>;
  getPublicTemplates(): Promise<Template[]>;
  getTemplatesByCategory(category: string): Promise<Template[]>;
  createTemplate(template: InsertTemplate): Promise<Template>;
  updateTemplate(id: number, updates: Partial<InsertTemplate>): Promise<Template | undefined>;

  // Generation operations
  getGeneration(id: number): Promise<Generation | undefined>;
  getGenerationsByProject(projectId: number): Promise<Generation[]>;
  getActiveGenerations(): Promise<Generation[]>;
  createGeneration(generation: InsertGeneration): Promise<Generation>;
  updateGeneration(id: number, updates: Partial<InsertGeneration>): Promise<Generation | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private templates: Map<number, Template>;
  private generations: Map<number, Generation>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.templates = new Map();
    this.generations = new Map();
    this.currentId = 1;
    
    // Initialize with some sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create default user
    const defaultUser: User = {
      id: 1,
      username: "johndoe",
      email: "john.doe@example.com",
      displayName: "John Doe",
      createdAt: new Date(),
    };
    this.users.set(1, defaultUser);

    // Create sample templates
    const sampleTemplates: Template[] = [
      {
        id: 1,
        name: "Interview Podcast",
        description: "Professional interview format with host and guest speakers",
        category: "podcast",
        mulmoScript: {
          $mulmocast: { version: "1.0" },
          speakers: [
            { name: "Host", voice: "alloy" },
            { name: "Guest", voice: "nova" }
          ],
          beats: [
            { text: "Welcome to our podcast. Today we have a special guest...", speaker: "Host" },
            { text: "Thank you for having me!", speaker: "Guest" }
          ]
        },
        isPublic: true,
        createdAt: new Date(),
      },
      {
        id: 2,
        name: "Product Demo Video",
        description: "Showcase product features with engaging visuals and narration",
        category: "video",
        mulmoScript: {
          $mulmocast: { version: "1.0" },
          speakers: [{ name: "Narrator", voice: "alloy" }],
          beats: [
            { 
              text: "Let me show you the amazing features of our new product...", 
              speaker: "Narrator",
              image: { prompt: "Modern product showcase with clean background" }
            }
          ]
        },
        isPublic: true,
        createdAt: new Date(),
      }
    ];
    
    sampleTemplates.forEach(template => {
      this.templates.set(template.id, template);
    });

    this.currentId = 3;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Project operations
  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getProjectsByUser(userId: number): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(project => project.userId === userId);
  }

  async createProject(projectData: InsertProject & { userId: number }): Promise<Project> {
    const id = this.currentId++;
    const project: Project = {
      ...projectData,
      id,
      status: "draft",
      description: projectData.description || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, updates: Partial<InsertProject>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updatedProject = { 
      ...project, 
      ...updates,
      updatedAt: new Date(),
    };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }

  // Template operations
  async getTemplate(id: number): Promise<Template | undefined> {
    return this.templates.get(id);
  }

  async getPublicTemplates(): Promise<Template[]> {
    return Array.from(this.templates.values()).filter(template => template.isPublic);
  }

  async getTemplatesByCategory(category: string): Promise<Template[]> {
    return Array.from(this.templates.values()).filter(template => 
      template.category === category && template.isPublic
    );
  }

  async createTemplate(insertTemplate: InsertTemplate): Promise<Template> {
    const id = this.currentId++;
    const template: Template = {
      ...insertTemplate,
      id,
      description: insertTemplate.description || null,
      isPublic: insertTemplate.isPublic || false,
      createdAt: new Date(),
    };
    this.templates.set(id, template);
    return template;
  }

  async updateTemplate(id: number, updates: Partial<InsertTemplate>): Promise<Template | undefined> {
    const template = this.templates.get(id);
    if (!template) return undefined;
    
    const updatedTemplate = { ...template, ...updates };
    this.templates.set(id, updatedTemplate);
    return updatedTemplate;
  }

  // Generation operations
  async getGeneration(id: number): Promise<Generation | undefined> {
    return this.generations.get(id);
  }

  async getGenerationsByProject(projectId: number): Promise<Generation[]> {
    return Array.from(this.generations.values()).filter(gen => gen.projectId === projectId);
  }

  async getActiveGenerations(): Promise<Generation[]> {
    return Array.from(this.generations.values()).filter(gen => 
      gen.status === 'pending' || gen.status === 'processing'
    );
  }

  async createGeneration(insertGeneration: InsertGeneration): Promise<Generation> {
    const id = this.currentId++;
    const generation: Generation = {
      ...insertGeneration,
      id,
      status: insertGeneration.status || "pending",
      progress: insertGeneration.progress || 0,
      outputUrl: insertGeneration.outputUrl || null,
      errorMessage: insertGeneration.errorMessage || null,
      createdAt: new Date(),
      completedAt: null,
    };
    this.generations.set(id, generation);
    return generation;
  }

  async updateGeneration(id: number, updates: Partial<InsertGeneration>): Promise<Generation | undefined> {
    const generation = this.generations.get(id);
    if (!generation) return undefined;
    
    const updatedGeneration = { 
      ...generation, 
      ...updates,
      completedAt: updates.status === 'completed' ? new Date() : generation.completedAt,
    };
    this.generations.set(id, updatedGeneration);
    return updatedGeneration;
  }
}

export const storage = new MemStorage();
