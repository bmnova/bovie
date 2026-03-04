export interface Project {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  color?: string;
  image?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}
