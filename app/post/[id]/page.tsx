'use client';

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Detail(){
    const params = useParams();

    return(
        <p>상세페이지 번호: {params.id}</p>
    )
}