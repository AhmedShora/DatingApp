using AutoMapper;
using DatingApp.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.Api.Dtos
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                    opt.MapFrom(src => src.Photos.First(a => a.IsMain).Url))
                .ForMember(dest=>dest.Age,opt=>opt.MapFrom(src=>src.DateOfBirth.Year*-1+(DateTime.Now.Year)));

            CreateMap<User, UserForDetailsDto>().ForMember(dest => dest.PhotoUrl, opt =>
                opt.MapFrom(src => src.Photos.First(a => a.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.Year * -1 + (DateTime.Now.Year)));

            CreateMap<Photo, PhotoForDto>();


        }
    }
}
