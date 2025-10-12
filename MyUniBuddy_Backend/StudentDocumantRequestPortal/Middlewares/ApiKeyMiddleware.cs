namespace StudentDocumantRequestPortal.Middlewares
{
    public class ApiKeyMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly string _apiKey;
        private const string API_KEY_HEADER_NAME = "AppKey"; // Explicitly define your header name

        public ApiKeyMiddleware(RequestDelegate next, IConfiguration configuration)
        {
            _next = next;
            // Ensure this path matches your appsettings.json
            _apiKey = configuration.GetValue<string>("Secret:ApiSecuityKey");

            // Optional: Add a check for _apiKey being null or empty here
            if (string.IsNullOrEmpty(_apiKey))
            {
                // Log a warning or throw a more specific exception during startup
                // if the API key is absolutely required.
                throw new InvalidOperationException("API Key 'Secret:ApiSecuityKey' is not configured in appsettings.json.");
            }
        }

        public async Task Invoke(HttpContext context)
        {
            var path = context.Request.Path.Value;

            // Bypass for Swagger UI and favicon
            if (path.StartsWith("/swagger") || path.StartsWith("/favicon.ico"))
            {
                await _next(context);
                return;
            }

            // Check if the API Key header is present
            if (!context.Request.Headers.TryGetValue(API_KEY_HEADER_NAME, out var extractedApiKey))
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized; // 401 Unauthorized
                await context.Response.WriteAsync("API Key missing.");
                return;
            }

            // Validate the API Key
            if (extractedApiKey != _apiKey) // Direct string comparison
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden; // 403 Forbidden
                await context.Response.WriteAsync("Invalid API Key.");
                return;
            }

            // If API Key is valid, proceed to the next middleware
            await _next(context);
        }
    }
}