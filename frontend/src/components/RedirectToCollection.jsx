import { useParams, Navigate } from "react-router-dom";

export default function RedirectToCollection() {
  const { id } = useParams();

  return <Navigate to={`/collection/${id}`} replace />;
}