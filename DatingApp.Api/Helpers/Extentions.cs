using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Api.Helpers
{
    public static class Extentions
    {
        public static void AddPagination(this HttpResponse httpResponse,
            int currentPage, int itemPerPage, int totalItems, int totalPages)
        {
            var paginationHeader = new PaginationHeader(currentPage, itemPerPage, totalItems, totalPages);
            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            httpResponse.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader,camelCaseFormatter));
            httpResponse.Headers.Add("Access-Control-Expose-Headers","Pagination");
        }
    }
}
