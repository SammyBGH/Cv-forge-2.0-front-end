import { Link, useParams } from 'react-router-dom';
import { CVBuilderProvider } from '../context/CVBuilderContext.jsx';
import BuilderWorkspace from '../components/builder/BuilderWorkspace.jsx';

export default function BuilderPage() {
  const { cvId } = useParams();

  return (
    <CVBuilderProvider cvId={cvId}>
      <BuilderWorkspace
        headerLeft={
          <Link to="/dashboard" className="builder-back">
            ← Dashboard
          </Link>
        }
      />
    </CVBuilderProvider>
  );
}
