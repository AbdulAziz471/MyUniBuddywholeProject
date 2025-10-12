import { Suspense } from 'react';
import { Loader2, Monitor, Globe, Code } from 'lucide-react';

const SplineLoader = () => (
  <div className="flex items-center justify-center h-full">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const PlaceholderModel = ({ icon: Icon, label }: { icon: any, label: string }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl border border-border/50">
    <Icon className="h-16 w-16 text-primary mb-4 animate-pulse" />
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);

export const ComputerModel = () => {
  return (
    <div className="w-full h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
      <PlaceholderModel icon={Monitor} label="3D Computer Model" />
    </div>
  );
};

export const WorldGlobeModel = () => {
  return (
    <div className="w-full h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
      <PlaceholderModel icon={Globe} label="3D World Globe" />
    </div>
  );
};

export const TechStackModel = () => {
  return (
    <div className="w-full h-[350px] lg:h-[450px] rounded-xl overflow-hidden">
      <PlaceholderModel icon={Code} label="3D Tech Stack" />
    </div>
  );
};