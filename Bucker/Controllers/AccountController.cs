using Bucker.Controllers.Models;
using Bucker.Data.Models;
using Bucker.Data.Repositories;
using Bucker.Models.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bucker.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IUserRepository _userRepository;

        public AccountController(IAccountRepository accountRepository, IUserRepository userRepository)
        {
            _accountRepository = accountRepository;
            _userRepository = userRepository;
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddUserAccountAsync(AccountRegistrationRequest request)
        {
            ValidateAccountRegistrationRequest(request);
            var owner = await _userRepository.GetByEmailAsync(request.OwnerEmail);

            if (owner == null)
                return BadRequest($"Account owner not found by email {request.OwnerEmail}");

            var account = await _accountRepository.AddUserAccountAsync(new Account
            {
                Name = request.Name,
                Description = request.Description,
                OwnerUserId = owner.UserId
            });

            return Ok(new
            {
                account.AccountId,
                account.Name,
                account.Description,
                account.CreatedDate,
                account.UpdatedDate
            });
        }

        [HttpGet]
        [Route("user/{userId:int}")]
        public async Task<IActionResult> GetAllUserAccountsAsync(int userId)
        {
            var accounts = await _accountRepository.GetUserAccountsAsync(userId);
            return Ok(accounts ?? Enumerable.Empty<Account>());
        }

        [HttpGet]
        [Route("user/{email}")]
        public async Task<IActionResult> GetAllUserAccountsAsync(string email)
        {
            var accounts = await _accountRepository.GetUserAccountsAsync(email);
            return Ok(accounts.OrderBy(a => a.CreatedDate) ?? Enumerable.Empty<Account>());
        }

        [HttpGet]
        [Route("{accountId:int}")]
        public async Task<IActionResult> GetAccountAsync(int accountId)
        {
            var account = await _accountRepository.GetAccountAsync(accountId);

            if (account == null)
                return NotFound($"No account found with id = {accountId}");

            return Ok(account);
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdateAccountAsync([FromBody] AccountUpdateRequest data)
        {
            ValidateAccountUpdateRequest(data);

            var account = await _accountRepository.GetAccountAsync(data.Id);

            if (account == null)
                return NotFound($"Account with identifier {data.Id} wasn't found");

            account.Name = data.Name;
            account.Description = data.Description;

            await _accountRepository.UpdateAccountAsync(account);

            return Ok(account);
        }

        [HttpDelete]
        [Route("delete/{accountId:int}")]
        public async Task<IActionResult> ArchiveAccountAsync(int accountId)
        {
            var account = await UpdateAccountStatusAsync(accountId, GlobalStatusCode.Inactive);
            return Ok(account);
        }

        [HttpPut]
        [Route("restore/{accountId:int}")]
        public async Task<IActionResult> RestoreAccountAsync(int accountId)
        {
            var account = await UpdateAccountStatusAsync(accountId, GlobalStatusCode.Active);
            return Ok(account);
        }

        #region Private
        private static void ValidateAccountRegistrationRequest(AccountRegistrationRequest request)
        {
            if (string.IsNullOrEmpty(request.OwnerEmail))
                throw new ArgumentException($"Email of account owner must be provided");

            if (string.IsNullOrEmpty(request.Name))
                throw new ArgumentException($"An acount name must be provided");
        }
        
        private static void ValidateAccountUpdateRequest(AccountUpdateRequest request)
        {
            if (request.Id == default)
                throw new ArgumentException($"Missing account identifier");

            if (string.IsNullOrWhiteSpace(request.Name))
                throw new ArgumentException($"A name is required for the account");
        }

        private async Task<Account> UpdateAccountStatusAsync(int accountId, GlobalStatusCode newStatus)
        {
            var account = await _accountRepository.GetAccountAsync(accountId);

            if (account == null)
                throw new ArgumentException("Account wasn't found");

            account.StatusCode = newStatus;

            await _accountRepository.UpdateAccountAsync(account);
            return account;
        }
        #endregion
    }
}
