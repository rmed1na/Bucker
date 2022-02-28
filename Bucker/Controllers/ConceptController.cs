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
        [Route("{conceptId:int}")]
        public async Task<IActionResult> GetConcept(int conceptId)
        {
            var concept = await _conceptRepository.GetAsync(conceptId);
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

        [HttpGet]
        [Route("{parentConceptId:int}/childs")]
        public async Task<IActionResult> GetConceptChilds(int parentConceptId)
        {
            var childs = await _conceptRepository.GetChildsAsync(parentConceptId);

            return Ok(childs);
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdateConceptAsync([FromBody] ConceptUpdateRequest request)
        {
            var concept = await _conceptRepository.GetAsync(request.Id);

            if (concept == null)
                return NotFound($"Concept with identifier {request.Id} wasn't found");

            concept.Name = request.Name;
            concept.Description = request.Description;

            await _conceptRepository.UpdateAsync(concept);

            return Ok(concept);
        }
    }
}
