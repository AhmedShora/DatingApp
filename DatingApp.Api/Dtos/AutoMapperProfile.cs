﻿using AutoMapper;
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
                    opt.MapFrom(src => src.Photos.FirstOrDefault(a => a.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.Year * -1 + (DateTime.Now.Year)));

            CreateMap<User, UserForDetailsDto>().ForMember(dest => dest.PhotoUrl, opt =>
                opt.MapFrom(src => src.Photos.FirstOrDefault(a => a.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.Year * -1 + (DateTime.Now.Year)));

            CreateMap<Photo, PhotoForDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<MessageForCreation, Message>().ReverseMap();
            CreateMap<Message, MessageToReturnDto>()
                .ForMember(a => a.RecipientPhotoUrl, opt => opt.MapFrom(p => p.Recipient.Photos.FirstOrDefault(q => q.IsMain).Url))
                .ForMember(a => a.SenderPhotoUrl, opt => opt.MapFrom(p => p.Sender.Photos.FirstOrDefault(q => q.IsMain).Url));





        }
    }
}
