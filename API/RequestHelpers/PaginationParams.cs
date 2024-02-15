namespace API.RequestHelpers
{
    public class PaginationParams
    {
        private const int MaxPagesize = 50;

        public int PageNumber {get; set; } = 1;

        private int _PageSize = 6; 

        public int Pagesize 
        {
            get => _PageSize;
            set => _PageSize = value > MaxPagesize ? MaxPagesize : value;
        }


    }
}