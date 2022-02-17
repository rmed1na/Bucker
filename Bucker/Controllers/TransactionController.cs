using Bucker.Controllers.Models;
using Bucker.Data.Models;
using Bucker.Data.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Bucker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionRepository _transactionRepository;

        public TransactionController(ITransactionRepository transactionRepository) => _transactionRepository = transactionRepository;

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddAsync(TransactionRegistrationRequest request)
        {
            //TODO: Validate incoming request data
            var transaction = new Transaction
            {
                Amount = request.Amount,
                ConceptId = request.ConceptId,
                AccountId = request.AccountId,
                Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description,
                EffectiveDate = request.EffectiveDate.HasValue ? request.EffectiveDate.Value : DateTime.UtcNow
            };

            await _transactionRepository.AddAsync(transaction);

            return Ok(transaction);
        }
    }
}
