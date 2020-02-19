import { TestBed } from '@angular/core/testing';

import { TodolistsService } from './todolists.service';

describe('TodoslistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodolistsService = TestBed.get(TodolistsService);
    expect(service).toBeTruthy();
  });
});
