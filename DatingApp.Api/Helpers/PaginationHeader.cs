using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Api.Helpers
{
    public class PaginationHeader
    {
        public int CurrentPage { get; set; }
        public int ItemPerPage { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }

        public PaginationHeader(int currentPage, int itemPerPage,
            int totalItems, int totalPages)
        {
            this.CurrentPage = currentPage;
            this.ItemPerPage = itemPerPage;
            this.TotalItems = totalItems;
            this.TotalPages = totalPages;
        }
    }
}
