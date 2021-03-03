using AutoMapper;
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
        private readonly IMapper _mapper;

        public AuthController(IAuthRepository auth, IMapper mapper,IConfiguration config)
        {
            _mapper = mapper;
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

            var userToCreate = _mapper.Map<User>(userForRegisterDto);
            var createdUser = await _auth.Register(userToCreate, userForRegisterDto.Password);
            var userToReturn = _mapper.Map<UserForDetailsDto>(createdUser);


            //return StatusCode(201);
            return CreatedAtRoute("GetUser",new {controller="User",id=createdUser.Id }, userToReturn);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto) 
        {
           // throw new Exception("Exception Test");
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
            var user = _mapper.Map<UserForListDto>(userFromAuth);
            return Ok(new { 
                token=tokenHandler.WriteToken(token),
                user
            });
        
        }
    }
}
