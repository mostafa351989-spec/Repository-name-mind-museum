import { useStore } from './store';
import Tree from './Tree';

export default function Forest() {
  const projects = useStore(s => s.projects);
  return <>{projects.map(p => <Tree key={p.id} position={p.pos as [number,number,number]} project={p} />)}</>;
}
