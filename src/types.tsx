
export interface Cluster {
    key: string;
    color: string;
    clusterLabel: string;
  }
  
  export interface Tag {
    key: string;
    image: string;
  }
  
  export interface FiltersState {
    clusters: Record<string, boolean>;
    tags: Record<string, boolean>;
  }