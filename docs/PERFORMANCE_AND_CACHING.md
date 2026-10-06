# Performance and caching

Infrastructure should protect the existing frontend rather than redesign it.

- The map is already lazy-loaded; preserve that behavior.
- Mostly-static public catalogue content can be cached at the edge/server as the backend grows.
- Do not cache personalized/private responses as public content.
- Keep the Iraq GeoJSON and other large geographic assets under review as the dataset grows.
- Prefer static/revalidated content for public catalogue data where correctness allows.
- Keep external map/source behavior compatible with MapLibre and the current OpenFreeMap setup.

Measure asset and bundle growth before introducing more infrastructure. Avoid optimization changes that make the frontend harder to maintain.
