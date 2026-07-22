type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[] | null;
};

export function JsonLd({ data }: JsonLdProps) {
  if (!data) return null;
  const payload = Array.isArray(data) ? data.filter(Boolean) : data;
  if (Array.isArray(payload) && payload.length === 0) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
