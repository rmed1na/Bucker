using Bucker.Controllers.Models;
using Bucker.Data.Models;
using Bucker.Data.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Bucker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ConceptController : ControllerBase
    {
        private readonly IConceptRepository _conceptRepository;

        public ConceptController(IConceptRepository conceptRepository) => _conceptRepository = conceptRepository;

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddAsync(ConceptRegistrationRequest request)
        {
            if (string.IsNullOrEmpty(request.Name))
                throw new ArgumentException($"{nameof(request.Name)} must be defined");

            var concept = new Concept
            {
                Name = request.Name,
                Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description,
                ParentConceptId = request.ParentId
            };

            await _conceptRepository.AddAsync(concept);

            return Ok(concept);
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetAllAsync()
        {
            var concepts = await _conceptRepository.GetAllAsync();
            return Ok(concepts);
        }

        [HttpGet]
        [Route("user/{userId:int}")]
        public async Task<IActionResult> GetAllUserConceptsAsync(int userId, bool onlyParents = false)
        {
            var concepts = await _conceptRepository.GetAllAsync(userId);

            if (onlyParents)
                return Ok(concepts.Where(c => !c.ParentConceptId.HasValue).ToList());

            return Ok(concepts);
        }
    }
}
