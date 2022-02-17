namespace Bucker.Models
{
    public class AppSettings
    {
        public DataSource DataSource { get; set; }
        public string AllowedOrigins { get; set; }
    }

    public class DataSource
    {
        public string Server { get; set; }
        public string Database { get; set; }
        public uint Port { get; set; }
        public string User { get; set; }
        public string Password { get; set; }
    }
}
