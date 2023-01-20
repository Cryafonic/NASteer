using Microsoft.AspNetCore.Mvc;

namespace NASteer.Controllers
{
    public class MarsPhotosController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult TodaysPhoto()
        {
            return View();
        }

        public string Welcome()
        {
            return "Welcome, its working!";
        }

    }
}
