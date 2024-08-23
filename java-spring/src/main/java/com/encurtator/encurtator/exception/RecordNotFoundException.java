package com.encurtator.encurtator.exception;

import java.util.UUID;

public class RecordNotFoundException extends RuntimeException{
    private static final UUID serialVersionUID = UUID.fromString("4f8367e5-fa6a-4fa7-b841-eafd45b4be5f");

    public RecordNotFoundException(UUID id){
        super("Register with the id" + id + " not found");
    }
}
