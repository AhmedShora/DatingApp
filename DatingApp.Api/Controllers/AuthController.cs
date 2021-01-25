using DatingApp.Api.Data;
using DatingApp.Api.Dtos;
using DatingApp.Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DatingApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _auth;
        private readonly IConfiguration _config;

        public AuthController(IAuthRepository auth,IConfiguration config)
        {
            _auth = auth;
            _config = config;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            //validate request use it with [FromBody] only if you didnt use [ApiController]
            /*  if (!ModelState.IsValid)
                  return BadRequest(ModelState);
            */
            userForRegisterDto.UserName = userForRegisterDto.UserName.ToLower();
            if (await _auth.UserExists(userForRegisterDto.UserName))
                return BadRequest("user Name is Already exsists");

            var userToCreate = new User
            {
                UserName = userForRegisterDto.UserName
            };
            var createdUse = await _auth.Register(userToCreate, userForRegisterDto.Password);

            return StatusCode(201);

        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto) 
        {
            var userFromAuth = await _auth.Login(userForLoginDto.UserName.ToLower(), userForLoginDto.Password);
            if (userFromAuth == null)
                return Unauthorized();

            var claims = new[]
            {
             new Claim(ClaimTypes.NameIdentifier,userFromAuth.Id.ToString()),
             new Claim(ClaimTypes.Name,userFromAuth.UserName)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_config.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new { 
                token=tokenHandler.WriteToken(token)
            });
        
        }
    }
}
