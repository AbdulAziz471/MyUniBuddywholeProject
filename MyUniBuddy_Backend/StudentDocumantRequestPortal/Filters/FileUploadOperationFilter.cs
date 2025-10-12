using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Linq;

public class FileUploadOperationFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        var fileParams = context.MethodInfo.GetParameters()
            .Where(p => p.ParameterType == typeof(IFormFile))
            .ToList();

        if (fileParams.Count == 0) return;

        operation.RequestBody = new OpenApiRequestBody
        {
            Content =
            {
                ["multipart/form-data"] = new OpenApiMediaType
                {
                    Schema = new OpenApiSchema
                    {
                        Type = "object",
                        Properties =
                        {
                            ["studentApplicationId"] = new OpenApiSchema { Type = "string", Format = "uuid" },
                            ["formId"] = new OpenApiSchema { Type = "string", Format = "uuid" },
                            ["degreeLevelId"] = new OpenApiSchema { Type = "string", Format = "uuid" },
                            ["file"] = new OpenApiSchema { Type = "string", Format = "binary" },
                            ["documentTypeId"] = new OpenApiSchema { Type = "string", Format = "uuid" },
                            ["studentCategoryId"] = new OpenApiSchema { Type = "string", Format = "uuid", Nullable = true }
                        },
                        Required = new HashSet<string> { "studentApplicationId", "formId", "degreeLevelId", "file", "documentTypeId" }
                    }
                }
            }
        };
    }
}