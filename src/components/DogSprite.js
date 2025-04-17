// src/components/DogSprite.js
import React, { memo } from 'react';

const DogSprite = memo(({ x = 0, y = 0, rotation = 0 }) => {
  return (
    <div
      className="absolute"
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
        transformOrigin: 'center',
        zIndex: 100,
        width: '121.5px',
        height: '109.5px',
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="dog2-a" x="0px" y="0px" width="121.50287628173828" height="109.5395278930664" viewBox="12.899236679077148 29.499656677246094 121.50287628173828 109.5395278930664" enableBackground="new 0 0 150 150" xmlSpace="preserve">
        <g>
          <g id="Back_Leg2">
            <path id="Fill_1_" fill="#20A6D8" d="M42.667,102.781c1.953,2.294,3.676,4.884,3.78,8.089c0.063,1.973-1.323,3.009-0.924,4.935c0.504,2.392,2.604,3.327,4.705,3.057c2.038-0.271,3.297-1.752,3.949-4.045c1.702,0.494,3.634-0.099,4.117-2.069c0.315-1.31-0.042-2.763-1.091-3.256c1.196-0.69,1.365-3.575,0.083-4.043c-1.366-0.494-2.311,0.098-3.697,0.688C51.553,101.352,46.91,104.014,42.667,102.781z" strokeWidth="1" />
            <path id="Outline_1_" fill="#272525" d="M53.69,105.281c0.945-0.816,2.256-1.363,3.303-0.896c2.084,0.928,2.699,3.188,1.45,5.752c0.929,2.874-1.111,6.569-3.595,5.784c-0.604,1.964-2.177,3.407-3.856,3.74c-4.958,0.987-6.938-3.61-5.236-8.581c-0.289-0.6-3.542-7.219-3.425-8.002l1.444-0.508c0.812,1.186,4.164,8.195,3.35,9.736c-2.195,4.149,2.096,7.818,5.843,4.32c1.529-1.429,0-5.424-0.728-6.256c1.869,0.047,2.674,2.402,3.101,3.538c1.655,0.123,1.989-1.583,2.014-2.501c0.072-2.645-2.092-2.686-3.665-2.973c-0.276-0.562,0.399-0.552,0.685-0.66c1.022-0.387,2.009,0.162,2.98,0.475c1.046-2.566-2.426-3.163-3.746-1.271l-1.833-2.975c-0.028-0.562,1.201,0.239,1.477,0.156L53.69,105.281z" strokeWidth="1" />
          </g>
          <g id="Body">
            <path id="Fill_2_" fill="#20A6D8" d="M19.25,75c0,0,3.747-14.655,19.5-20.75s23.125-3.75,31-1.5c0,0,6.875-14.125,14.25-16.125s12.247-1.732,17.25,5.5s9.5,9.5,9.5,9.5s9.375,1.375,11.75,2.25S132.875,57,133,66.375S127.125,76,127.125,76s-2.25,6.625-6.5,5.875s-11.125-5.625-13-3.5s-2.195,3.388-1.75,5.125s4.189,4.541,1.625,7.375s-12.375,0.75-14.25-1.625s-2.875-4.75-2.875-4.75s-1.125,4.375-4.625,7s-17.625,16.25-39.5,12s-24.125-5.375-24.125-5.375S14.789,85.841,19.25,75z" strokeWidth="1" />
            <path id="Outline_2_" fill="#272525" d="M133.271,62.946c-0.119-0.417-0.718-2.168-1.354-3.529c-0.396-0.845-5.084-7.333-18.763-7.992c-0.156-0.063-0.318-0.122-0.484-0.177c-4.98-2.046-12.42-11.617-12.42-11.617l-0.002,0.001c-0.475-1.151-1.141-2.197-1.918-3.084c-6.408-7.314-19.926-0.465-24.183,8.175c-0.394,0.747-4.402,6.941-4.402,6.941l-2.383-0.467c-4.552-2.443-12.748-3.938-18.652-2.466c-8.102,1.858-15.328,5.516-21.776,11.925v-0.001c-4.176,3.504-7.35,10.144-8.899,13.871c-0.348,0.722-0.723,1.718-1.044,2.702c-0.001,0.004-0.004,0.013-0.004,0.013c-0.408,1.252-0.729,2.471-0.791,3.037c-0.542,4.947,1.287,10.461,3.032,14.812c0.447,1.113,1.568,3.109,2.481,3.835c4.209,3.344,19.83,4.802,19.83,4.802l0.001-0.007c5.833,1.59,12.992,1.997,17.501,1.614c13.25-1.125,22.094-8.399,27.945-13.685c1.285-1.161,2.44-2.727,3.334-4.305c0.677,1.583,2.354,3.422,4.152,4.306c13.438,6.623,16.026-2.65,14.152-5.149c-1.875-2.5-2.537-3.972-2.083-5.328c0.401-1.201,2.39-2.731,4.771-1.701c4.086,1.77,8.449,5.76,13.02,2.279c1.309-0.996,2.283-2.682,2.941-4.59C134.162,75.771,134.676,67.929,133.271,62.946z M130.156,72.3c-0.461,0.553-1.236,1.275-2.115,1.79c0.26-1.545,0.344-3.081,0.254-4.4c-0.047-0.718-0.096-1.656-0.566-2.185c-0.199,0.069-0.893,0.196-0.881,0.561c0.098,3.184-0.385,6.768-1.828,9.6c-1.34,2.627-4.164,2.611-6.43,2.611c-3.98,0-7.709-4.53-11.646-2.043c-1.096,0.693-1.919,2.174-2.305,3.656c-0.607,2.334,4.986,4.734,2.361,8.207s-9.398,0-9.398,0c-2.22-1.072-3.357-1.021-5.336-3.086c-0.945-0.979-1.637-1.933-2.55-3.324c-0.573,1.691-1.134,2.646-2.146,3.989c-0.496,0.659-1.664,1.468-2.368,2.364c-10.615,10.609-24.339,13.118-24.327,13.084c-12.974,2.157-25.185-2.696-31.292-9.413c-0.351-0.386-0.825-0.789-1.335-0.664c0.013,1.114,1.091,2.464,1.658,3.321c1.142,1.729,2.704,3.137,4.511,4.298c-9.567-1.272-11.949-4.005-12.029-4.1c-1.862-3.817-3.33-7.889-3.767-12.729c-0.11-1.223-0.021-2.407,0.129-3.573c1.865-7.519,7.968-16.086,8.165-16.36c4.377-4.043,9.072-7.167,14.231-9.267c6.592-2.422,14.033-4.558,21.353-2.849c1.126,0.179,2.276,0.662,3.414,0.942l0.001,0l4.707,1.275l5.575-9.849c2.787-3.492,5.873-6.054,10.002-7.186c4.422-1.211,7.771-1.353,11.525,2.042c0.232,0.211,0.586,0.725,0.971,1.229c3.967,7.082,11.104,11.972,11.127,11.994c0.122,0.11,0.311,0.19,0.523,0.259c0.006,0.004,0.027,0.016,0.027,0.016l0.012-0.004c0.469,0.145,1.084,0.211,1.717,0.22l-0.002,0.003c0,0,14.73,1.419,18.432,7.224c0.041,0.072,0.082,0.145,0.123,0.217c0.027,0.045,0.051,0.091,0.076,0.136c0.264,0.474,0.512,0.959,0.682,1.497C132.518,65.319,132.502,69.494,130.156,72.3z" strokeWidth="1" />
          </g>
          <g id="R_Eye">
            <path id="Outline_4_" fill="#272525" d="M109.042,41.858c1.942,2.829,2.19,7.079,0.769,10.256c-1.855,4.148-7.004,2.283-8.813-0.902C97.243,44.606,104.197,34.798,109.042,41.858z" strokeWidth="1" />
            <path id="White" fill="#FFFFFF" d="M107.184,42.665c2.125,2.684,3.354,11.29-1.819,9.686c-2.894-0.896-4.519-6.926-2.55-9.542C103.734,41.587,106.225,41.454,107.184,42.665z" strokeWidth="1" />
            <ellipse id="Pupil" fill="#272525" cx="107.648" cy="48.322" rx="1.549" ry="1.818" strokeWidth="1" />
          </g>
          <g id="R_Eyebrow">
            <path id="Outline_3_" fill="#272525" d="M103.502,30.936c-1.111,0.97-2.195,3.244-2.021,4.89c0.256,0.306,2.324-1.505,3.074-1.709c2.682-0.73,3.219,2.733,4.487,2.992C109.996,32.505,106.871,27.998,103.502,30.936z M102.814,33.786c0.388-1.844,4.106-4.891,5.541,1.045C106.622,32.631,105.043,32.529,102.814,33.786z" strokeWidth="1" />
            <path id="Fill_3_" fill="#8ED1D8" d="M102.814,33.786c2.229-1.257,3.808-1.155,5.541,1.045C106.921,28.895,103.202,31.942,102.814,33.786z" strokeWidth="1" />
          </g>
          <g id="L_Eye">
            <path id="Outline_6_" fill="#272525" d="M97.113,54.772c0.176,4.263-7.213,5.033-9.625,2.375c-0.459-0.507-1.168-1.094-0.891-1.947C87.988,50.954,94.725,50.405,97.113,54.772z" strokeWidth="1" />
            <path id="White_1_" fill="#FFFFFF" d="M95.738,54.962c-1.816,3.381-7.551,2.452-7.764,0.57C89.127,52.936,94.468,52.463,95.738,54.962z" strokeWidth="1" />
            <ellipse id="Pupil_1_" fill="#272525" cx="94.639" cy="55.77" rx="1.549" ry="1.818" strokeWidth="1" />
          </g>
          <g id="L_Eyebrow">
            <path id="Outline_5_" fill="#272525" d="M85.143,49.644c2.188-0.697,6.715-0.463,9.625-0.38C93.854,43.905,86.725,45.012,85.143,49.644z M86.598,48.838c1.278-1.782,4.766-3.18,6.229-0.903C90.738,47.794,88.577,47.998,86.598,48.838z" strokeWidth="1" />
            <path id="Fill_4_" fill="#8ED1D8" d="M86.598,48.838c1.979-0.84,4.141-1.044,6.229-0.903C91.363,45.658,87.876,47.056,86.598,48.838z" strokeWidth="1" />
          </g>
          <g id="Tail">
            <path id="Fill_5_" fill="#20A6D8" d="M26.125,71.827c0.892-0.726,1.585-1.667,1.878-2.796c0.355-1.37,0.308-2.792-0.205-4.032c-0.074-0.013-0.149-0.043-0.223-0.109c-0.547-0.495-0.996-0.932-1.27-1.525c-4.123-3.894-5.152-9.941-3.074-15.393c1.373-3.609,3.395-4.708,6.065-7.09c-7.178,1.09-12.508,4.588-14.806,12.53c-2.224,7.724,2.984,17.942,8.296,19.295C23.931,72.544,25.207,72.574,26.125,71.827z" strokeWidth="1" />
            <path id="Outline_7_" fill="#272525" d="M22.122,50.388c-1.092,4.391-0.25,10.747,3.018,13.949c0.653,0.526,1.19,1.645,1.94,1.195c0.031-0.042,0.062-0.081,0.093-0.123c0.15-0.328,0.162-0.725,0.122-1.072c-0.077-0.657-0.262-1.428-0.646-2.023c-2.554-1.513-3.794-5.539-3.37-8.885c0.503-5.839,4.686-10.893,8.993-13.228c0.587-0.185,1.11-0.505,1.634-0.824c-12.389-0.477-20.008,8.85-20.49,18.335c-0.238,5.702,2.074,10.801,5.952,14.416c2.338,2.182,4.049-0.808,3.783-1.486c-3.127-1.735-5.711-4.753-6.961-8.404c-1.682-6.227,0.593-12.528,4.873-16.396c1.931-1.831,4.16-3.321,6.548-4.02C25.262,43.859,22.815,46.873,22.122,50.388z" strokeWidth="1" />
          </g>
          <g id="Back_Leg1">
            <path id="Fill_6_" fill="#20A6D8" d="M41.494,114.631c-6.828-25.11-21.055-29.881-19.083-16.132c2.131,3.066,4.426,5.949,6.027,10.504c2.63,7.43,0.932,14.938,2.931,20.333c0.784,2.117,2.564,2.776,4.529,2.659c1.665-0.078,2.331-2.034,3.996-1.877c2.598,0.273,6.128,0.234,5.196-4.85c4.13-0.078,5.828-4.496,3.997-7.039C46.988,115.335,42.459,118.182,41.494,114.631z" strokeWidth="1" />
            <path id="Outline_8_" fill="#272525" d="M50.039,119.32c-1.385-3.353-4.972-3.859-7.765-3.988c-0.579-2.017-4.507-17.09-6.358-16.151c-0.339,1.557,4.677,16.405,5.873,18.1c8.69-0.504,8.088,6.828,4.044,6.837c-0.848-1.384-2.191-2.796-3.761-2.421c0.986,1.435,1.771,1.99,2.224,3.418c1.016,3.199-1.906,5.582-4.286,4.465c0.515-2.268,0.117-6.036-2.588-5.366c0.68,0.892,1.169,1.228,1.457,2.28c1.417,5.177-7.077,7.376-7.765-0.809c-0.451-5.357,0.312-11.566-1.779-16.617c-2.006-4.846-4.705-9.042-7.088-13.406c-0.027-0.009-0.556-0.63-0.584-0.644c-1.265-0.619-1.17,0.809-1.224,1.871c3.506,5.856,7.781,10.99,8.813,18.443c0.734,5.299-1.884,17.344,4.844,18.729c2.032,0.416,3.661-0.119,5.136-1.854c2.795,0.553,7.539-1.233,6.803-6.382c1.091-0.405,2.764-0.873,3.518-1.946C50.319,122.79,50.563,120.591,50.039,119.32z" strokeWidth="1" />
          </g>
          <g id="Front_Leg2">
            <path id="Fill" fill="#20A6D8" d="M109.511,84.078c-1.606-2.18-4.115-2.629-6.35-1.659c0.001-0.006,0.002-0.011,0.003-0.017c-2.375,1.685-3.624,4.384-3.949,7.457c0.145,1.061,0.475,2.126,0.975,3.135c-5.659,2.188-12.02,3.918-15.241-1.587c-0.325-0.183-0.651-0.363-0.981-0.522c-0.87-0.419-2.284-1.077-3.111-0.18c-0.769,0.834-0.547,1.938-0.216,2.938c0.079-0.062,0.148-0.122,0.229-0.185c1.399,2.463,1.247,4.564,2.93,6.727c2.865,3.676,6.195,5.553,10.925,6.883c6.494,1.799,13.922-0.234,17.521-4.066c3.067-3.271,2.562-6.607,0.999-11.104C112.409,89.513,110.943,86.033,109.511,84.078z" strokeWidth="1" />
            <path id="Outline" fill="#272525" d="M113.484,88.107c-1.75-3.616-5.344-6.998-9.243-6.653c-2.354,0.207-5.29,2.573-6.106,5.223c-0.412,1.337-0.363,4.296,1.173,5.812c-4.051,1.115-10.388,1.707-13.612-0.853c-0.475-0.283-0.874-0.758-1.25-1.114c-0.207-0.195-0.455-0.467-0.727-0.63c-0.117,0.359-0.122,0.729,0.061,1.104c2.8,5.75,13.726,4.886,16.874,2.836c0.112,1.744,1.231,3.646,2.795,4.634c-0.269,0.783-0.197,2.797,1.562,4.068c0.832,0.599,5.049,1.597,4.771-0.477c-0.887-0.938-2.17-0.41-3.194-0.998c-2.464-1.41-1.008-5.567,2.306-6.172c0.409-0.074,1.107,0.166,1.375-0.238c0.228-0.344-4.771-1.877-6.592,2.279c-3.898-3.263,0.104-8.865,5.055-7.977c-2.931-1.508-6.41-1.191-7.765,2.755c-0.594-0.635-1.454-1.587-1.454-2.612c0-4.296,6.039-7.846,10.271-2.99c2.476,2.844,4.443,10.072,3.314,14.008c-1.047,3.646-5.022,4.994-7.885,5.507c-8.1,1.448-15.094-0.063-20.746-7.405c-1.062-1.379-2.424-4.786-3.316-5.604c-0.526-0.481-0.75-0.166-0.889,0.666c0.197,2.314,1.424,4.248,2.547,6.076c3.463,5.638,9.83,8.315,15.609,8.644c5.045,0.284,12.748-0.416,15.527-6.174C115.654,98.285,115.109,91.466,113.484,88.107z" strokeWidth="1" />
          </g>
          <g id="Front_Leg1">
            <path id="Fill_7_" fill="#20A6D8" d="M78.124,120.336c-4.794-6.178-4.788-10.355-7.58-18.682c0.036-0.007,0.068-0.017,0.104-0.023c-0.989-1.468-2.052-2.899-3.828-3.223c-3.508-0.639-7.026,1.509-6.736,5.135c0.024-0.004,0.044-0.006,0.068-0.01c1.666,5.863,7.56,18.65,7.46,21.584c-0.066,2.346-1.665,3.283-1.731,5.632c-0.1,3.167,1.499,5.864,4.13,6.567c2.631,0.705,4.163-2.348,6.793-1.719c2.998,0.7,7.927-2.189,6.396-5.32c2.563-0.741,4.923-5.209,3.157-7.475C83.669,119.352,80.054,122.839,78.124,120.336z" strokeWidth="1" />
            <path id="Outline_9_" fill="#272525" d="M79.23,120.77c-3.315-5.197-5.197-12.77-6.635-19.103c0.008-0.007,0.042-0.022,0.09-0.042c-0.519-0.965-1.151-1.821-2.109-1.973c-0.484,0.265-0.891,0.626-0.768,1.279c0.885,4.702,5.82,19.002,9.222,21.551c3.213-2.24,8.737-0.25,7.116,4.463c-0.217,0.642-1.328,1.462-1.858,1.711c-1.524,0.711-2.806-3.549-5.138-1.853c1.617,0.956,2.522,1.568,3.115,3.229c1.633,4.587-3.297,4.9-5.662,4.558c0.057-0.501,0.316-0.79,0.403-1.282c0.433-2.432-0.312-5.094-2.831-4.797c0.729,1.205,2.535,2.317,0.971,5.604c-1.698,3.563-5.58,2.522-7.442-0.238c-2.58-3.823,0.998-7.972,0.849-8.878c-0.034-0.209-7.07-19.084-7.775-23.145c-0.03-0.031-0.062-0.059-0.085-0.104c-0.116-0.219-0.294-0.345-0.49-0.404c-0.273,0.057-0.541,0.104-0.812,0.155c-0.142,0.113-0.255,0.269-0.309,0.467c-0.162,0.591-0.152,1.21-0.092,1.816c0.028,0.285,0.068,0.568,0.112,0.852c0.031-0.005,0.065-0.01,0.097-0.016c0.147-0.026,4.752,14.897,7.066,20.257c-1.631,2.582-2.125,6.154-1.043,9.191c1.451,4.078,6.348,6.588,11.052,2.051c1.179,1.777,8.289,1.805,7.623-5.234c1-0.156,2.494-0.547,3.502-2.709C90.564,121.391,83.098,118.374,79.23,120.77z" strokeWidth="1" />
          </g>
          <g id="Nose">
            <path id="Outline_10_" fill="#272525" d="M130.131,50.696c-2.916-5.089-19.675,0.276-16.636,7.695c2.101,5.129,8.485,6.214,12.099,5.327C129.207,62.83,133.068,55.823,130.131,50.696z M125.258,61.616c-2.605,0.79-10.343-1.532-8.674-6.233c1.111-3.137,10.355-5.998,12.198-3.372C130.324,54.209,127.863,60.828,125.258,61.616z" strokeWidth="1" />
            <path id="Fill_8_" fill="#205ED8" d="M116.584,55.382c-1.669,4.701,6.068,7.023,8.674,6.233c2.605-0.788,5.066-7.406,3.524-9.605C126.939,49.384,117.695,52.246,116.584,55.382z" strokeWidth="1" />
          </g>
          <g id="Ear">
            <path id="Fill_9_" fill="#205ED8" d="M82.532,54.734c0.934-1.486,2.099-2.542,1.731-4.38c-0.398-1.876-1.832-2.307-3.33-3.128c-2.729-1.486-5.029-2.66-7.728-1.096c-5.529,3.247-6.395,9.777-6.395,17.049c0,4.066,0.899,6.843,3.331,9.698c2.032,2.385,5.695,2.854,7.459,0.156C81.534,67.091,78.734,60.678,82.532,54.734z" strokeWidth="1" />
            <path id="Outline_11_" fill="#272525" d="M75.923,73.005c-1.274,1.021-3.463,0.521-4.65-0.475c-5.599-4.696-3.799-21.821,1.941-25.07c3.593-2.033,8.478,1.362,9.453,1.018c-2.696-3.233-5.896-3.266-7.122-3.217c-0.982-0.009-1.643,0.128-2.843,0.664c-6.076,2.919-7.776,16.057-6.362,22.38c0.774,3.455,4.461,7.718,7.643,7.738c2.513,0.014,4.222-2.522,5.178-4.89c1.952-4.843,1.642-8.529,2.709-13.438c0.376-1.731,2.819-4.275,2.196-6.188C78.493,50.777,81.35,68.657,75.923,73.005z" strokeWidth="1" />
          </g>
        </g>
      </svg>
    </div>
  );
});

export default DogSprite;
